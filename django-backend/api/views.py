from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate, login, logout
from .models import User, Adventure, Character, Item
from .serializers import (
    UserSerializer, 
    AdventureSerializer, 
    AdventureCreateSerializer,
    CharacterSerializer, 
    ItemSerializer
)
from .services import ClaudeService


class UserViewSet(viewsets.ModelViewSet):
    """
    ViewSet for User CRUD operations
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def signup(self, request):
        """Create new user account"""
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email', '')
        
        if not username or not password:
            return Response(
                {'error': 'Username and password required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if User.objects.filter(username=username).exists():
            return Response(
                {'error': 'Username already exists'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        user = User.objects.create_user(
            username=username,
            password=password,
            email=email
        )
        login(request, user)
        
        return Response(
            UserSerializer(user).data, 
            status=status.HTTP_201_CREATED
        )
    
    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def signin(self, request):
        """Login existing user"""
        username = request.data.get('username')
        password = request.data.get('password')
        
        user = authenticate(request, username=username, password=password)
        
        if user is None:
            return Response(
                {'error': 'Invalid credentials'}, 
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        login(request, user)
        return Response(UserSerializer(user).data)
    
    @action(detail=False, methods=['post'])
    def signout(self, request):
        """Logout current user"""
        logout(request)
        return Response({'message': 'Logged out successfully'})
    
    @action(detail=False, methods=['get'])
    def me(self, request):
        """Get current user info"""
        return Response(UserSerializer(request.user).data)


class AdventureViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Adventure CRUD operations
    """
    queryset = Adventure.objects.all().order_by('id')
    permission_classes = [IsAuthenticated]
    
    def get_serializer_class(self):
        """Use different serializer for create vs retrieve"""
        if self.action == 'create':
            return AdventureCreateSerializer
        return AdventureSerializer
    
    def create(self, request):
        """Create new adventure with initial item and character"""
        serializer = AdventureCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        adventure = serializer.save()
        
        # Create character for this user in this adventure
        Character.objects.create(
            user=request.user,
            adventure=adventure,
            context=[adventure.prompt]
        )
        
        return Response(
            AdventureSerializer(adventure).data, 
            status=status.HTTP_201_CREATED
        )
    
    def destroy(self, request, pk=None):
        """Delete adventure (only if user has a character in it)"""
        adventure = self.get_object()
        
        # Check if user has a character in this adventure
        if not adventure.characters.filter(user=request.user).exists():
            return Response(
                {'error': 'You do not have access to this adventure'}, 
                status=status.HTTP_403_FORBIDDEN
            )
        
        adventure.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CharacterViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Character CRUD operations
    """
    queryset = Character.objects.all()
    serializer_class = CharacterSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """Users can only see their own characters"""
        return Character.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        """Automatically set user to current user"""
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    #POST /api/characters/{id}/generate/
    def generate(self, request, pk=None):
        """
        Generate AI response for this character's adventure.
        Takes user input, gets Claude response, updates context.
        """
        character = self.get_object()
        user_input = request.data.get('input', '')
        
        if not user_input:
            return Response(
                {'error': 'Input is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Get current conversation context
        context = character.context or []
        
        # Add user's input to context
        context.append({
            'role': 'user',
            'content': user_input
        })
        
        # Generate Claude response
        claude_service = ClaudeService()
        ai_response = claude_service.generate_response(context)
        
        # Add AI response to context
        context.append({
            'role': 'assistant',
            'content': ai_response
        })
        
        # Update character's context
        character.context = context
        character.save()
        
        return Response({
            'response': ai_response,
            'context': context
        })
    
    @action(detail=True, methods=['post'])
    #POST /api/characters/{id}/start/
    def start(self, request, pk=None):
        """
        Start a new adventure - get initial scene from Claude.
        """
        character = self.get_object()
        adventure = character.adventure
        
        # Get starting item
        starting_item = adventure.items.first()
        
        if not starting_item:
            return Response(
                {'error': 'Adventure has no starting item'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Generate initial scene
        claude_service = ClaudeService()
        initial_response = claude_service.start_adventure(
            adventure.prompt,
            starting_item.title,
            starting_item.context[0] if starting_item.context else "A mysterious item"
        )
        
        # Initialize context with system prompt and initial response
        context = [
            {
                'role': 'system',
                'content': 'You are a game master for GPTQuest. Create engaging stories and present 3 action choices.'
            },
            {
                'role': 'user',
                'content': f"{adventure.prompt}\n\nStarting item: {starting_item.title}"
            },
            {
                'role': 'assistant',
                'content': initial_response
            }
        ]
        
        # Update character's context
        character.context = context
        character.save()
        
        return Response({
            'response': initial_response,
            'context': context
        })


class ItemViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Item CRUD operations
    """
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [IsAuthenticated]
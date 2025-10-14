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


class ItemViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Item CRUD operations
    """
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [IsAuthenticated]
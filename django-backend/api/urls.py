from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, AdventureViewSet, CharacterViewSet, ItemViewSet

# Create router and register viewsets
router = DefaultRouter()
router.register('users', UserViewSet, basename='user')
router.register('adventures', AdventureViewSet, basename='adventure')
router.register('characters', CharacterViewSet, basename='character')
router.register('items', ItemViewSet, basename='item')

urlpatterns = [
    path('', include(router.urls)),
]

############CHEATSHEET#########################################################
#User Endpoints:
#POST /api/users/signup/ - Create account
#POST /api/users/signin/ - Login
#POST /api/users/signout/ - Logout
#GET /api/users/me/ - Get current user
#GET /api/users/ - List all users
#GET /api/users/{id}/ - Get specific user

#Adventure Endpoints:
#GET /api/adventures/ - List all adventures
#POST /api/adventures/ - Create new adventure
#GET /api/adventures/{id}/ - Get specific adventure
#PATCH /api/adventures/{id}/ - Update adventure
#DELETE /api/adventures/{id}/ - Delete adventure

#Character Endpoints:
#GET /api/characters/ - List my characters
#POST /api/characters/ - Create character
#PATCH /api/characters/{id}/ - Update character context
#DELETE /api/characters/{id}/ - Delete character

#Item Endpoints:
#GET /api/items/ - List all items
#POST /api/items/ - Create item
#GET /api/items/{id}/ - Get specific item
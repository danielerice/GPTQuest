from rest_framework import serializers
from .models import User, Adventure, Character, Item


class UserSerializer(serializers.ModelSerializer):
    """Serializes User model for API responses"""
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email']
        # Never expose password in API responses!


class ItemSerializer(serializers.ModelSerializer):
    """Serializes Item model"""
    
    class Meta:
        model = Item
        fields = ['id', 'adventure', 'title', 'context', 'created_at']


class CharacterSerializer(serializers.ModelSerializer):
    """Serializes Character model with conversation context"""
    
    class Meta:
        model = Character
        fields = ['id', 'user', 'adventure', 'context', 'created_at', 'updated_at']


class AdventureSerializer(serializers.ModelSerializer):
    """Serializes Adventure with related items"""
    items = ItemSerializer(many=True, read_only=True)
    
    class Meta:
        model = Adventure
        fields = ['id', 'title', 'prompt', 'description', 'items', 'created_at', 'updated_at']


class AdventureCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating adventures with initial item"""
    item_title = serializers.CharField(write_only=True)
    item_context = serializers.ListField(write_only=True)
    
    class Meta:
        model = Adventure
        fields = ['title', 'prompt', 'description', 'item_title', 'item_context']
    
    def create(self, validated_data):
        """Create adventure and initial item together"""
        item_title = validated_data.pop('item_title')
        item_context = validated_data.pop('item_context')
        
        adventure = Adventure.objects.create(**validated_data)
        Item.objects.create(
            adventure=adventure,
            title=item_title,
            context=item_context
        )
        
        return adventure
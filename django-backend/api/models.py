from django.db import models
from django.contrib.auth.models import AbstractUser




class User(AbstractUser):
    '''Custom user with auto password hashing'''

    def __str__(self):
        return self.username
    
    
class Adventure(models.Models):
    '''Adventure - the story container'''

    title = models.CharField(max_length=200)
    prompt = models.TextField()
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def __str__(self):
        return self.title
    

class Character(models.Model):
    """Character - connects User to Adventure, stores conversation context"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='characters')
    adventure = models.ForeignKey(Adventure, on_delete=models.CASCADE, related_name='characters')
    context = models.JSONField(default=list)  # Conversation history
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ['user', 'adventure']
    
    def __str__(self):
        return f"{self.user.username}'s character in {self.adventure.title}"
    

class Item(models.Model):
    """Item - inventory items in adventures"""
    adventure = models.ForeignKey(Adventure, on_delete=models.CASCADE, related_name='items')
    title = models.CharField(max_length=200)
    context = models.JSONField(default=list)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title
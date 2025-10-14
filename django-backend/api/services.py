import anthropic
from django.conf import settings


class ClaudeService:
    """
    Service for interacting with Claude API.
    Keeps API key secure on backend!
    """
    
    def __init__(self):
        self.client = anthropic.Anthropic(
            api_key=settings.ANTHROPIC_API_KEY
        )
    
    def generate_response(self, messages, max_tokens=1024):
        """
        Generate a response from Claude based on conversation history.
        
        Args:
            messages: List of message dicts with 'role' and 'content'
            max_tokens: Maximum tokens in response
            
        Returns:
            String response from Claude
        """
        try:
            # Claude API uses 'user' and 'assistant' roles
            # Filter out 'system' messages and handle them separately
            claude_messages = []
            system_prompt = None
            
            for msg in messages:
                if msg.get('role') == 'system':
                    # Claude handles system prompts separately
                    system_prompt = msg.get('content', '')
                elif msg.get('role') in ['user', 'assistant']:
                    claude_messages.append({
                        'role': msg['role'],
                        'content': msg['content']
                    })
            
            # Make the API call
            response = self.client.messages.create(
                model="claude-sonnet-4-5-20250929",
                max_tokens=max_tokens,
                system=system_prompt if system_prompt else "You are a helpful game master for a text-based adventure game called GPTQuest. Create engaging, immersive stories and present players with 3 interesting choices.",
                messages=claude_messages
            )
            
            # Extract the text response
            return response.content[0].text
            
        except anthropic.APIError as e:
            # Handle API errors gracefully
            return f"Error communicating with AI: {str(e)}"
    
    def start_adventure(self, adventure_prompt, starting_item_title, starting_item_description):
        """
        Start a new adventure with initial setup.
        
        Args:
            adventure_prompt: The adventure's initial prompt
            starting_item_title: Title of starting item
            starting_item_description: Description of starting item
            
        Returns:
            Initial story response from Claude
        """
        system_prompt = "You are a game master for GPTQuest, a text-based adventure game. Set the scene dramatically and present the player with 3 interesting action choices."
        
        initial_message = f"{adventure_prompt}\n\nYou start with: {starting_item_title} - {starting_item_description}"
        
        messages = [
            {
                'role': 'system',
                'content': system_prompt
            },
            {
                'role': 'user',
                'content': initial_message
            }
        ]
        
        return self.generate_response(messages)
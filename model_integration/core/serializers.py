from rest_framework.serializers import ModelSerializer
from .models import Conversation

class ChatSerializer(ModelSerializer):
    class Meta:
        model = Conversation
        fields = ["id", "model", "prompt", "response"]


    
    
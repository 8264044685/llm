from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from core import serializers as core_serializers
from core import models as core_models
# Create your views here.
import replicate


modal = {
    "llama2": "meta/llama-2-70b-chat",
    "mistral": "mistralai/mixtral-8x7b-instruct-v0.1",
}

class llalmaModelChat(APIView):
    def get(self, request):
        all_conversations = core_models.Conversation.objects.all()
        serializer_instance = core_serializers.ChatSerializer(all_conversations, many=True)
        return Response(serializer_instance.data)
    
    def post(self, request):
        
        user_prompt = request.data.get('user_prompt', "what is the meaning of life?")
        selected_model = request.data.get('selected_model', "mistral")
        
        full_response = ""
        for event in replicate.stream(
            f"{modal[selected_model]}",
            input={
                "prompt": user_prompt,
                "max_tokens": 512,
                "temperature": 0.5,
                
            },
        ):
            full_response += str(event)
            print(str(event), end="")
            
        
        serializer_instance = core_serializers.ChatSerializer(data={
            "model": selected_model,
            "prompt": user_prompt,
            "response": full_response
        })
        if serializer_instance.is_valid():
            serializer_instance.save()
        else:
            print(serializer_instance.errors)

        return Response({'message': full_response})


class ConversionDetails(APIView):
    
    def get(self, request, pk):
        all_conversations = core_models.Conversation.objects.get(pk=pk)
        serializer_instance = core_serializers.ChatSerializer(all_conversations)
        return Response(serializer_instance.data)
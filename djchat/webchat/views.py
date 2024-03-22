from webchat.models import Conversation, Message
from rest_framework import viewsets
from rest_framework.response import Response
from .serializers import MessageSerializer
from .schemas import list_message_docs
# Create your views here.
class MessageViewSet(viewsets.ViewSet):
    
    @list_message_docs
    def list(self, request):
        channel_id = request.query_params.get('channel_id')

        try:
            conversation = Conversation.objects.get(channel_id=channel_id)
            message = conversation.message_conversation.all()
            serializer = MessageSerializer(message, many=True)
            return Response(serializer.data)
            
        except Exception as e:
            return Response(e)

        

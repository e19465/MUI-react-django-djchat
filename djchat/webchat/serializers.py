
from rest_framework import serializers
from .models import Message, Conversation

class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.StringRelatedField()
    class Meta:
        model  = Message
        fields =  ['id', 'sender', 'content', 'timestamp']
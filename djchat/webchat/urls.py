from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import MessageViewSet

webchat_router = DefaultRouter()
webchat_router.register("api/messages", MessageViewSet, basename='message')

# urlpatterns = [
#     path("/messages", MessageViewSet.as_view({'get:list'}))
# ]

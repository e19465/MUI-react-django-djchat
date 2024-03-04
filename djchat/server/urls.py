from django.urls import path
from rest_framework.routers import DefaultRouter
from server.views import ServerListViewSet

server_router = DefaultRouter()
server_router.register("api/server/select", ServerListViewSet)

# urlpatterns = [
#     path("select/", ServerListViewSet.as_view({'get':'list'}))
# ]

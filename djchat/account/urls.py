from django.urls import path
from .views import AccountViewSet



urlpatterns = [
    path("", AccountViewSet.as_view({'get':'retrieve'})),
]

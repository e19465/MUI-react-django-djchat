from account.views import JWTCookieTokenObtainPairView, JWTCookieTokenRefreshView
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
# from server.urls import server_router
from webchat.urls import webchat_router

#consummer
from webchat.consumer import WebChatConsumer

urlpatterns = [
    path("admin/", admin.site.urls),

    # jwt token paths
    path('api/token/', JWTCookieTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', JWTCookieTokenRefreshView.as_view(), name='token_refresh'),

    # allow to download schema
    path("api/docs/schema/", SpectacularAPIView.as_view(), name="schema"),

    # access the swagger ui
    path("api/docs/schema/ui/", SpectacularSwaggerView.as_view()),

    # this method is also work instead of (+ server_router.urls)
    path("api/server/", include("server.urls")),

    # user urls
    path("api/account/", include("account.urls")),

] + webchat_router.urls
#+ server_router.urls

# serve static files
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)




websocket_urlpatterns = [
    path('<str:serverId>/<str:channelId>/', WebChatConsumer.as_asgi())
]
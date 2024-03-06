
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
# from server.urls import server_router

urlpatterns = [
    path("admin/", admin.site.urls),

    # allow to download schema
    path("api/docs/schema/", SpectacularAPIView.as_view(), name="schema"),

    # access the swagger ui
    path("api/docs/schema/ui/", SpectacularSwaggerView.as_view()),

    # this method is also work instead of (+ server_router.urls)
    path("api/servers/", include("server.urls")),

]
#+ server_router.urls

# serve static files
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
from django.conf import settings
from django.conf.urls.static import static
from django.urls import re_path, path, include
from django.contrib import admin

from shared import names, routes
from views import api, public

VIEW_API_DISPATCHER = api.request_handler
VIEW_GENERAL_REDIRECTOR = public.request_handler

PATH_GENERAL_REDIRECTOR = re_path(
    routes.GENERAL_REDIRECTOR,
    VIEW_GENERAL_REDIRECTOR,
    name=names.GENERAL_REDIRECTOR,
)

PATH_API_DISPATCHER = re_path(
    routes.API_DISPATCHER,
    VIEW_API_DISPATCHER,
    name=names.API_DISPATCHER,
)


base_urlpatterns = [
    PATH_API_DISPATCHER,
    PATH_GENERAL_REDIRECTOR,
]
import notifications.urls
urlpatterns = [
    path('admin/', admin.site.urls),
    path('inbox/notifications/', include(notifications.urls, namespace='notifications')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

urlpatterns.extend(base_urlpatterns)

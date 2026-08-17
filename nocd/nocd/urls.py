from django.conf import settings
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('main.urls')), # konek di folder main
]

# django-browser-reload hanya untuk development
if settings.DEBUG:
    urlpatterns.append(path("_reload_/", include("django_browser_reload.urls")))

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('main.urls')), # konek di folder main

    path("_reload_/", include("django_browser_reload.urls")), # django-browser-reload
]

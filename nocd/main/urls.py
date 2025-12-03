from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index, name='home'),

    # path("_reload_/", include("django_browser_reload.urls")), # django-browser-reload
]

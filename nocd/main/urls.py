from django.urls import path, include
from . import views

urlpatterns = [
    # Tampilan
    path('', views.index, name='home'),

    # API
    path('api/stringdb', views.stringdb, name='stringdb'),
]  

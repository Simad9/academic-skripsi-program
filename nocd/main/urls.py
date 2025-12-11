from django.urls import path, include
from . import views

urlpatterns = [
    # Tampilan
    path('', views.index, name='home'),

    # BE - Endpoint API 
    path('api/stringdb-image', views.stringdb_image, name='stringdb_image'),
    path('api/stringdb-table', views.stringdb_table, name='stringdb_table'),    
]  

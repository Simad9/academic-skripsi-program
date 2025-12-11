from django.urls import path, include
from . import views

urlpatterns = [
    # Tampilan
    path('', views.index, name='home'),
    path("loading", views.loading, name="loading"),

    # API
    path('api/stringdb-image', views.stringdb_image, name='stringdb_image'),
    path('api/stringdb-table', views.stringdb_table, name='stringdb_table'),
    
    # Endpoint yang dipanggil oleh AJAX untuk mendapatkan data
    path('get-data/', views.get_processed_data, name='get_processed_data'),
]  

from django.urls import path, include
from . import views

urlpatterns = [
    # Tampilan
    path('', views.index, name='home'),

    # BE - Endpoint API 
    # Input Dataset
    path('api/stringdb-image', views.stringdb_image, name='stringdb_image'),

    # Deteksi Komunitas
    path('api/pilih-dataset', views.pilih_dataset, name='pilih_dataset'),
    path('api/tabel-dataset', views.tabel_dataset, name='tabel_dataset'),
    path('api/input-model', views.input_model, name='input_model'),
    path('api/deteksi-komunitas', views.deteksi_komunitas, name='deteksi_komunitas'),

    
]  

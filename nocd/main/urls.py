from django.urls import path, include
from . import views

urlpatterns = [
    # Health check untuk Render
    path('health', views.health_check, name='health_check'),
    
    # Tampilan
    path('', views.index, name='home'),

    # BE - Endpoint API 
    # Deteksi Komunitas
    path('api/pilih-dataset', views.pilih_dataset, name='pilih_dataset'), # Detail + Gambar STRINGDB
    path('api/tabel-dataset', views.tabel_dataset, name='tabel_dataset'),
    path('api/input-model', views.input_model, name='input_model'),
    path('api/deteksi-komunitas', views.deteksi_komunitas, name='deteksi_komunitas'),

    # Enrichment Analysis
    path('api/enrichment-analysis', views.enrichment_analysis_komunitas, name="enrichment_analysis_komunitas"),
    
]  

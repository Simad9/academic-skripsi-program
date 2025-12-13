from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.templatetags.static import static
import json

# Library
import os
import pandas as pd

# Import dari file
from .code_ml.stringdb import *
from .code_ml.deteksiKomunitas import *
from .code_ml.enrichmentAnalysis import *

def index(request):
  number_list = range(1, 30)
  context = {
        'numbers': number_list,
    }
  return render(request, "index.html", context)

# ==== Untuk API - Skripsi - BE - Endpoint API  ====
# ~ Input Dataset ~
"""
Input Dataset (.xlsx) lalu ubah menjadi viasualisasi image STRINGDB
Tujuan : Visualisasi Graf STRINGDB Secara garis besar
Input : File - Dataset (.xlsx)
Output : Gambar Graf STRINGDB
"""
@csrf_exempt
def stringdb_image(request):
  # Cek method POST
  if request.method != "POST":
      return JsonResponse({"error": "Hanya menerima POST request"}, status=405)
  
  # Ambil Data dari File
  file = request.FILES.get("file_dataset")
  
  # Jika buka file
  if not file:
    return JsonResponse({"error": "tidak ada file yang diupload"}, status=400)

  # Simpan file di direktori "uploads"
  upload_dir = os.path.join(settings.BASE_DIR, 'uploads') 
  os.makedirs(upload_dir, exist_ok=True)

  # Path file
  file_path = os.path.join(upload_dir, file.name)

  # Simpan file di direktori uploads
  with open(file_path, "wb") as f:
    for chunk in file.chunks():
      f.write(chunk)
    
  # Baca Excel
  try:
    df = pd.read_excel(file_path)      
  except Exception as e:
    return JsonResponse({"error": f"Failed to read excel: {str(e)}"}, status=500)

  # Cek Kolom gen
  if 'Gen' not in df.columns:
      return JsonResponse({"error": "Kolom 'Gen' tidak ditemukan pada file."}, status=400)
  
  # Buat menjadi list
  data_list = df['Gen'].dropna().astype(str).tolist()
    
  # Ambil data dari STRINGDB API
  try: 
    img_path = stringdb_fetch_api_img(data_list)  # harus mengembalikan path relatif di static, mis "files/stringdb_image.png"
  except Exception as e:
    return JsonResponse({"error": f"{str(e)}"}, status=500)    
   
  # setup data
  data = {
    "status": "success",
    "message": "Gambar STRINGDB berhasil dibuat",
    "data": {
      "img_path": f"http://localhost:8000{static(img_path)}",
    }
  }

  # kembalikan json data
  return JsonResponse(data, status=200)

# ~ Deteksi Komunitas ~
"""
Pilih Dataset (.tsv) dari STRINGDB sesuai dengan require_score
Tujuan : Agar User bisa bebas mau pake dataset yang gimana
Input : String - require_score
Output : Statistik Dataset yang dipilih
"""
@csrf_exempt
def pilih_dataset(request):
    # Cek method dah bener belum
    if request.method != "POST":
        return JsonResponse({"error": "Hanya menerima POST request"}, status=405)    
    
    # Setup JSON simpelnya
    try:    
        input_data = json.loads(request.body.decode('utf-8'))        
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON format"}, status=400)
    
    require_score = str(input_data.get("require_score"))  
    detail = detail_dataset(require_score)

    # Setup variabel dataset
    nodes = detail['n_nodes']
    edges = detail['n_edges']
    desnity = detail['density']
    
    # setup data response
    response_data = {
        "status": "success",
        "message": "Hasil Dataset berhasil dimuat",
        "data": {
            "nodes": nodes,
            "edges": edges,
            "density": desnity,
        }
    }

    return JsonResponse(response_data, status=200)

"""
Menampilkan Dataset yang dipilih dalam bentuk Tabel dan sudah pagination
Tujuan : Memperlihatkan ke user kalo isi datasetnya begitu
Input : String - require_score
Output : Tabel Dataset sudah pagination
"""
@csrf_exempt
def tabel_dataset(request):
  # Cek method dah bener belum
  if request.method != "POST":
    return JsonResponse({"error": "Hanya menerima POST request"}, status=405) 
  
  # Setup JSON simpelnya
  try:    
    input_data = json.loads(request.body.decode('utf-8'))        
  except json.JSONDecodeError:
    return JsonResponse({"error": "Invalid JSON format"}, status=400)
  
  # Ambil Data JSON
  require_score = str(input_data.get("require_score"))     
  page = int(input_data.get("page", 1))
  dataset_result = ambil_tabel_dataset(require_score, page=page, page_size=20)

  # setup data response
  response_data = {
    "status": "success",
    "message": f"Tabel Dataset halaman {page} ditampilkan",
    "data": dataset_result
  }

  return JsonResponse(response_data, status=200)

"""
Input Model GNN yang sudah disave
Tujuan : Memasukan model GNN yang udah ditrain dan oke (onChange nanti dimasukin langsung tampil)
Input : File - Model (.pth)
Output : Config Model
"""
@csrf_exempt
def input_model(request):
  # Cek method POST
  if request.method != "POST":
      return JsonResponse({"error": "Hanya menerima POST request"}, status=405)
  
  # Ambil Data dari File
  file = request.FILES.get("file_model")
  filename = file.name

  config = ambil_config_model(filename)

   # setup data
  data = {
    "status": "success",
    "message": "Model GNN (pth) berhasil diload",
    "data": config
  }

  # kembalikan json data
  return JsonResponse(data, status=200)

"""
Melakukan Deteksi Komunitas dengan Model GNN dan threshold yang dipilih
Tujuan : Melakukan Deteksi Komunitas Overlapingnya, kalo sudah masukin model kalo belum nanti bakal kesimpen
Input : File - Model (.pth), Float - Threshold, String - require_score
Output : Data Komunitas , Evaluasi Model
"""
@csrf_exempt
def deteksi_komunitas(request):
  # Cek method POST
  if request.method != "POST":
      return JsonResponse({"error": "Hanya menerima POST request"}, status=405)
  
  # Ambil Data dari File | bisa string aja sih sebenarnya
  file_model = request.FILES.get("file_model")
  threshold = float(request.POST.get("threshold"))
  require_score = str(request.POST.get("require_score"))
  file_model_name = file_model.name
  
  # Simpan file dulu!
  path_model_dir = os.path.join(settings.BASE_DIR, 'main', 'code_ml', 'models')
  os.makedirs(path_model_dir, exist_ok=True) # Buat folder jika belum ada
  path_save_model = os.path.join(path_model_dir, file_model.name)
  with open(path_save_model, "wb") as f:
    for chunk in file_model.chunks():
        f.write(chunk)

  # Ngambil Data Result
  result = deteksi_komunitas_proses(file_model_name, threshold, require_score)
  # Ngambil Evaluasi
  evaluasi = evaluasi_deteksi_komunitas()

  # setup data
  data = {
    "status": "success",
    "message": "Deteksi Komunitas berhasil dilakukan",
    "evaluasi": evaluasi,
    "data": result
  }

  # kembalikan json data
  return JsonResponse(data, status=200)

#  ~ Enrichment Analaysis ~
"""
Menampilkan Semua List Komunitas yang ada
Tujuan : Melihat fungsi dari komunitas yang dipilih untuk enrichment analysis
Input : Array - gene_list
Output : Data enrichment analysis
"""
@csrf_exempt
def enrichment_analysis_komunitas(request):
  # Cek method dah bener belum
  if request.method != "POST":
    return JsonResponse({"error": "Hanya menerima POST request"}, status=405) 
  
  # Setup JSON simpelnya
  try:    
    input_data = json.loads(request.body.decode('utf-8'))        
  except json.JSONDecodeError:
    return JsonResponse({"error": "Invalid JSON format"}, status=400)
  
  # Ambil Data JSON
  gene_list = input_data.get("gene_list")

  result = ambil_enrichment_analysis(gene_list)

  # setup data
  data = {
    "status": "success",
    "message": f"Enrichment Analysis berhasil didapat",
    # "gene_list": gene_list,
    "data": result
  }

  # kembalikan json data
  return JsonResponse(data, status=200)
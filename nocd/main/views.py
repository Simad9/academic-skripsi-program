from django.shortcuts import render
from django.http import JsonResponse
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.templatetags.static import static

# Library
import os
import pandas as pd

# Import dari file
from .ml_proses.stringdb import stringdb_fetch_api_img, stringdb_data_tsv

def index(request):
  number_list = range(1, 30)
  context = {
        'numbers': number_list,
    }
  return render(request, "index.html", context)


@csrf_exempt
def stringdb(request):
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
    data_tsv = stringdb_data_tsv(data_list)
  except Exception as e:
    return JsonResponse({"error": f"{str(e)}"}, status=500)    
   
  # setup data
  data = {
    "status": "success",
    "message": "Proses selesai",
    "data": {
      "img_path": static(img_path),
      "table_data": data_tsv
    }
  }

  # kembalikan json data
  return JsonResponse(data, status=200)

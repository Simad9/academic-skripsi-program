# ml_proses/stringdb.py
from django.conf import settings
from django.templatetags.static import static
import os
import requests
from time import sleep
import pandas as pd

def stringdb_fetch_api_img(data_list):
    # Params awal
    string_api_url = "http://string-db.org/api"
    output_format = "image"
    method = "network"

    # Gabungin URL
    requests_url = "/".join([string_api_url, output_format, method])

    # separator_url = "%0d"
    # merge_string = separator_url.join(data_list)

    # Param untuk STRINGDB API
    params = {
        "identifiers": "%0d".join(data_list), # your protein,
        "species": 9606,
    }

    # Buat path di main/static/files
    static_images_dir = os.path.join(settings.BASE_DIR, "main", "static", "files")

    # Jika belum ada dibuatkan
    os.makedirs(static_images_dir, exist_ok=True)

    # Buat if nanti dan return
    full_output = os.path.join(static_images_dir, "stringdb_image.png")
    rel_output = "files/stringdb_image.png"  

    # jika sudah ada, return langsung (opsional)
    if os.path.exists(full_output):
        return rel_output

    # panggil API STRING-DB
    response = requests.post(requests_url, params=params, timeout=30)
    if response.status_code == 200:
        with open(full_output, "wb") as f:
            f.write(response.content)
        sleep(1)
        return rel_output
    else:
        raise Exception(f"STRING-DB returned status {response.status_code}")

def stringdb_fetch_api_tsv(data_list):
    # Param
    string_api_url = "https://version-12-0.string-db.org/api"
    output_format = "tsv"
    method = "interaction_partners"

    request_url = "/".join([string_api_url, output_format, method])

    params = {
    "identifiers" : "%0d".join(data_list), # protein dataset
    "species" : 9606, # Homo sapiens
    "required_score": 900, # required interaction score
    "network_type": "functional", 
    }

    # Buat path di main/static/files
    static_files_dir = os.path.join(settings.BASE_DIR, "main", "static", "files")

    # Jika belum ada dibuatkan
    os.makedirs(static_files_dir, exist_ok=True)

    # Buat if nanti dan return
    full_output = os.path.join(static_files_dir, "stringdb_result.tsv")
    rel_output = "files/stringdb_result.tsv"  

    # jika sudah ada, return langsung (opsional)
    if os.path.exists(full_output):
        return rel_output

    # panggil API STRING-DB
    response = requests.post(request_url, params=params, timeout=30)
    if response.status_code == 200:
        with open(full_output, "wb") as f:
            f.write(response.content)
        sleep(1)
        return rel_output
    else:
        raise Exception(f"STRING-DB returned status {response.status_code}")

# ... (kode stringdb_fetch_api_tsv dan fungsi lain) ...

def stringdb_data_tsv(data_list):
    path_tsv = stringdb_fetch_api_tsv(data_list)
    
    # [PERBAIKAN KRITIS]: Dapatkan base path ke static/
    # path_tsv sudah berisi 'files/stringdb_result.tsv'
    base_static_dir = os.path.join(settings.BASE_DIR, "main", "static")
    
    # Gabungkan base_static_dir dengan path_tsv
    full_output = os.path.join(base_static_dir, path_tsv) # <-- PERBAIKAN DI SINI!

    # [PERBAIKAN TAMBAHAN]: Ubah output data menjadi List of Dictionaries
    # agar lebih mudah diolah di JavaScript dan sesuai praktik API.
    
    try:
        df = pd.read_csv(full_output, sep='\t')
    except FileNotFoundError:
        # Jika file .tsv tidak ditemukan (kemungkinan API gagal/file lama terhapus)
        # Sebaiknya lempar error atau kembalikan list kosong
        raise Exception(f"File TSV tidak ditemukan di: {full_output}")
    
    subset = df[["preferredName_A", "preferredName_B", "score"]]
    subset = subset.rename(columns={
        "preferredName_A": "Node1",
        "preferredName_B": "Node2",
        "score": "Combine_Score"
    })
    
    # Konversi ke List of Dictionaries (Records) dan bulatkan skor
    data_records = subset.to_dict('records')
    for record in data_records:
        record['Combine_Score'] = round(record['Combine_Score'], 3)
        
    # Kembalikan list of dictionaries, bukan dictionary of lists
    return data_records
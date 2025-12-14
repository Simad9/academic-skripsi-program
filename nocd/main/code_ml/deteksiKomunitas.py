# Setting Django
from django.conf import settings
import os

# Library
import math
import pandas as pd
import numpy as np
import scipy.sparse as sp
from sklearn.preprocessing import normalize
import torch
import torch.nn.functional as F

# Libaray GNN NOCD
from .gnn_lib import *

"""
# Ambil Dataset sesuai require_score
params:
require_score: nilai require_score
return:
path_dataset: path datasetnya
"""
def ambil_dataset(require_score):  
  # Path File Dataset
  filename = f"stringdb_result_{require_score}.tsv"

  # Mau dari API atau Web
  source = "api"

  # Masuk ke path nya
  path_dataset = os.path.join(
        settings.BASE_DIR, 
        'main',
        'code_ml', 
        f'stringdb_{source}_tsv',
        filename  
    )

  return path_dataset

"""
# Dari Dataset Buat Matrix A (Adjency Matrix)
params:
file_dataset: path file dataset
return:
A: Adjacency Matrix
"""
def ambil_matrix_A(file_dataset):
  try:
      df = pd.read_csv(file_dataset, sep='\t')
  except FileNotFoundError:
      print(f"ERROR: File tidak ditemukan di {file_dataset}")
      raise 
      
  # Ambil kolom yang diperlukan
  subset = df[["preferredName_A", "preferredName_B", "score"]]

  # Buat id untuk gen nya
  nodes = pd.concat([subset["preferredName_A"], subset["preferredName_B"]]).unique()
  node_to_id = {node: i for i, node in enumerate(nodes)}

  # buat edge list dalam bentuk id
  edges = np.array([
    [node_to_id[a], node_to_id[b]]
      for a, b in zip(df["preferredName_A"], df["preferredName_B"])
  ])

  # Buat adjacency matrix (A) sebagai sparse CSR, graf undirected
  num_nodes = len(nodes)

  ## Edge dari A -> B
  row = edges[:, 0]
  col = edges[:, 1]
  data = df["score"].values # bobot = score

  ## tambahkan edge dari B → A untuk undirected
  row2 = edges[:,1]
  col2 = edges[:,0]
  data2 = df["score"].values

  row = np.concatenate([row, row2])
  col = np.concatenate([col, col2])
  data = np.concatenate([data, data2])

  A = sp.csr_matrix((data, (row, col)), shape=(num_nodes, num_nodes))

  return A

"""
# Ambil Data Normalisasi
params:
A: Adjacency Matrix
return:
data_norm: Data Normalisasi A
"""
def ambil_data_norm(A):
  data_norm = normalize(A)
  data_norm = utils.to_sparse_tensor(data_norm)

  return data_norm

def ambil_adj_norm(A, config):  
  # Ngambil Hyperparamater dari model dulu
  input_dim = config['input_dim']
  hidden_dims = config['hidden_dims']
  output_dim = config['output_dim']
  batch_norm = config['batch_norm']
  dropout = config['dropout']

  gnn = nn.GCN(input_dim, hidden_dims, output_dim, batch_norm, dropout)
  adj_norm = gnn.normalize_adj(A)

  return adj_norm

def load_model(nama_file):
   # Masuk ke path nya
  path_model = os.path.join(
        settings.BASE_DIR, 
        'main',
        'code_ml', 
        'models',
        nama_file  
    )
  
  # Ambil confignya hyperparamaters
  checkpoint = torch.load(path_model)

  return checkpoint


# ---- UNTUK API ----
def detail_dataset(require_score):
  file_dataset = ambil_dataset(require_score)
  A = ambil_matrix_A(file_dataset)

  n_nodes = A.shape[0]
  n_edges = A.nnz // 2  # Undirected
  density = (2 * n_edges) / (n_nodes * (n_nodes - 1))

  data_detail = {
    'n_nodes': n_nodes,
    'n_edges': n_edges,
    'density': density
  }  

  return data_detail

"""
# Ambil Tabel Dataset dengan Pagination
params:
require_score: nilai require_score
page: halaman ke berapa yang diminta (default 1)
page_size: jumlah data per halaman (default 20)
"""
def ambil_tabel_dataset(require_score, page=1, page_size=20):
    # 1. Load Data Frame utuh
    file_dataset = ambil_dataset(require_score)
    
    try:
        df = pd.read_csv(file_dataset, sep='\t')
    except FileNotFoundError:
        return None # Atau raise error sesuai kebutuhan
    
    subset = df[["preferredName_A", "preferredName_B", "score"]]

    # Rename columns
    subset = subset.rename(columns={
        "preferredName_A": "Node1",
        "preferredName_B": "Node2",
        "score": "Combine_Score"
    })

    # 2. Hitung Total Data & Halaman
    total_records = len(subset)
    total_pages = math.ceil(total_records / page_size)

    # 3. Validasi Page (agar tidak minus atau melebihi max page)
    if page < 1: page = 1
    if page > total_pages and total_records > 0: page = total_pages

    # 4. Hitung Start dan End Index untuk Slicing
    # Rumus: 
    # Halaman 1: index 0 s/d 20
    # Halaman 2: index 20 s/d 40
    start_index = (page - 1) * page_size
    end_index = start_index + page_size

    # 5. Ambil data sesuai halaman (Slicing)
    # .iloc[start:end] akan mengambil baris dari start sampai (end-1)
    # .fillna("") agar nilai NaN (kosong) jadi string kosong biar gak error di JSON
    df_page = subset.iloc[start_index:end_index].fillna("")

    # 6. Convert ke Dictionary (List of Objects)
    records = df_page.to_dict(orient='records')

    # 7. Siapkan return data lengkap dengan info pagination
    result = {
        "records": records,
        "pagination": {
            "current_page": page,
            "total_pages": total_pages,
            "total_records": total_records,
            "page_size": page_size,
            "has_next": page < total_pages,
            "has_prev": page > 1
        }
    }

    return result

def ambil_config_model(nama_file):  
  checkpoint = load_model(nama_file)
  config = checkpoint['hyperparameters']

  # Setup Return
  config = {
     "input_dim": config['input_dim'],
     "hidden_dims": config['hidden_dims'],
     "output_dim": config['output_dim'],
     "batch_norm": config['batch_norm'],
     "dropout": config['dropout'],
  }

  return config

def membuat_peta_keanggotaan(communities_list, node_names):
  # --- BAGIAN 1: Pre-processing (Membuat Peta Keanggotaan Node) ---
  # Kita butuh tahu satu node itu muncul di komunitas mana saja
  node_membership = {}

  for comm_idx, community_indices in enumerate(communities_list):
      comm_id = comm_idx + 1 # ID Komunitas (mulai dari 1)
      for node_idx in community_indices:
          if node_idx not in node_membership:
              node_membership[node_idx] = []
          node_membership[node_idx].append(comm_id)

  # --- BAGIAN 2: Membuat Data Dictionary ---
  data_komunitas = []

  for i, community_indices in enumerate(communities_list):
      # Skip jika komunitas kosong
      if len(community_indices) == 0:
          continue

      comm_id = i + 1
      
      # 1. Konversi indeks ke nama gen
      # node_names diambil dari kodemu sebelumnya: {0: 'ERCC1', ...}
      current_node_names = [node_names[idx] for idx in community_indices]
      
      # 2. Cari Node Overlap & Irisan Komunitas
      overlap_nodes_names = []
      intersecting_comms = set() # Pakai set agar ID komunitas tidak duplikat
      
      for node_idx in community_indices:
          # Cek di 'node_membership', apakah node ini punya lebih dari 1 komunitas?
          member_of = node_membership[node_idx]
          if len(member_of) > 1:
              # Ini node overlap!
              overlap_nodes_names.append(node_names[node_idx])
              
              # Catat komunitas lain yang beririsan (selain komunitas ini sendiri)
              for other_comm_id in member_of:
                  if other_comm_id != comm_id:
                      intersecting_comms.add(f"Kom {other_comm_id}")

      # 3. Hitung Statistik
      total_nodes = len(current_node_names)
      total_overlap = len(overlap_nodes_names)
      
      # Hitung Persentase
      ratio_val = (total_overlap / total_nodes) * 100 if total_nodes > 0 else 0
      ratio_str = f"{ratio_val:.1f}%" # Format string, misal "80.5%"

      # Tentukan Tipe & Format untuk tampilan kosong
      if total_overlap > 0:
          tipe_komunitas = "Overlapping"
          final_node_overlap = overlap_nodes_names
          # Ubah set ke list urut
          final_irisan = sorted(list(intersecting_comms)) 
      else:
          tipe_komunitas = "Non-Overlapping"
          final_node_overlap = ["-"]
          final_irisan = ["-"]

      # 4. Susun Dictionary
      entry = {
          "komunitas": comm_id,
          "jumlah_node": total_nodes,
          "tipe": tipe_komunitas,
          "gen_terdaftar": current_node_names,
          "node_overlap": final_node_overlap,
          "irisan": final_irisan,
          "rasio_overlap": ratio_str
      }
      
      data_komunitas.append(entry)

  return data_komunitas

def deteksi_komunitas_proses(nama_file_model, threshold, require_score):
  # Load model
  checkpoint = load_model(nama_file_model)
  config = checkpoint['hyperparameters']  
  model = nn.GCN(
    input_dim= config['input_dim'],    
    hidden_dims= config['hidden_dims'], 
    output_dim= config['output_dim'],
    batch_norm= config['batch_norm'],
    dropout= config['dropout']
  ) 
  model.load_state_dict(checkpoint['model_state'])
  model.eval()

  # Ambil Matrix A
  file_dataset = ambil_dataset(require_score)
  A = ambil_matrix_A(file_dataset)

  # Normalisasi Data
  data_norm = ambil_data_norm(A)
  adj_norm = ambil_adj_norm(A, config)

  # Pembilahan Matriksnya
  with torch.no_grad():
    Z = F.relu(model(data_norm, adj_norm))
  Z_pred = Z.cpu().detach().numpy() > threshold

  # Komunitas List
  communities_list = utils.coms_matrix_to_list(Z_pred)  

  # Membuat Peta Keanggotaan
  try:
      df = pd.read_csv(file_dataset, sep='\t')
  except FileNotFoundError:
      print(f"ERROR: File tidak ditemukan di {file_dataset}")
      raise 
      
  # Ambil kolom yang diperlukan
  subset = df[["preferredName_A", "preferredName_B", "score"]]

  # Buat id untuk gen nya
  nodes = pd.concat([subset["preferredName_A"], subset["preferredName_B"]]).unique()
  node_to_id = {node: i for i, node in enumerate(nodes)}
  node_names = {i: node for node, i in node_to_id.items()} # PERHATIKAN URUTANNYA DIBALIK

  # Komunitas Dictionary
  node_membership = membuat_peta_keanggotaan(communities_list, node_names)

  return node_membership

def evaluasi_deteksi_komunitas():
  
  #  Data Dummy
  evulasi = {
     "jumlah_komunitas": 46,
     "modularity_overlaping": 0.400,
     "partition_density": 0.398,
     "conductane": 0.315
  }

  return evulasi
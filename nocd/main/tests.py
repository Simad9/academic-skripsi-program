import os
import torch
import pandas as pd
import numpy as np
import scipy.sparse as sp
from django.test import TestCase, Client
from django.urls import reverse
from django.conf import settings
from .code_ml.deteksiKomunitas import ambil_matrix_A
from .code_ml.gnn_lib import nn

class GNNWhiteBoxTest(TestCase):
    def setUp(self):
        # Setup Client untuk pengujian API
        self.client = Client()
        
        # Buat file TSV sementara untuk testing parser
        self.test_tsv_path = os.path.join(settings.BASE_DIR, 'test_data.tsv')
        data = {
            'preferredName_A': ['GEN1', 'GEN2'],
            'preferredName_B': ['GEN2', 'GEN3'],
            'score': [0.4, 0.7]
        }
        df = pd.DataFrame(data)
        df.to_csv(self.test_tsv_path, sep='\t', index=False)

    def tearDown(self):
        # Hapus file sementara setelah tes selesai
        if os.path.exists(self.test_tsv_path):
            os.remove(self.test_tsv_path)

    # 1. Validasi Parser Data
    def test_parser_logic(self):
        """Memastikan file .tsv diparsing menjadi matriks adjasensi yang benar"""
        # Eksekusi fungsi parser dari deteksiKomunitas.py
        A = ambil_matrix_A(self.test_tsv_path)
        
        # Cek apakah hasilnya matriks sparse
        self.assertTrue(sp.issparse(A))
        # Cek dimensi (3 gen unik: GEN1, GEN2, GEN3 -> Matriks 3x3)
        self.assertEqual(A.shape, (3, 3))
        # Cek apakah nilai bobot (score) masuk dengan benar
        self.assertEqual(A.nnz, 4)  # 2 edge x 2 (karena undirected)

    # 2. Logika Model GNN
    def test_gnn_forward_pass(self):
        """Memastikan forward pass model GNN menghasilkan dimensi embedding yang sesuai"""
        input_dim = 10
        hidden_dims = [16]
        output_dim = 8
        num_nodes = 5
        
        # Inisialisasi model dari library GNN
        model = nn.GCN(input_dim, hidden_dims, output_dim, batch_norm=True, dropout=0.0)
        model.eval()
        
        # Buat dummy input tensor
        x = torch.randn(num_nodes, input_dim)
        adj = torch.eye(num_nodes).to_sparse() # Dummy adjasensi
        
        # Eksekusi forward pass
        with torch.no_grad():
            output = model(x, adj)
            
        # Validasi dimensi output (Harus: Jumlah Node x Output Dim)
        self.assertEqual(output.shape, (num_nodes, output_dim))

    # 3. Respon API
    def test_api_tabel_dataset_status(self):
        """Memastikan API mengembalikan status code yang tepat (Success & Error)"""
        # Skenario 1: POST dengan data yang kurang (Error 400/500 atau ditangani views)
        # Endpoint diambil dari urls.py
        url = reverse('tabel_dataset')
        
        # Skenario 2: Simulasi request gagal (tanpa parameter required)
        response_fail = self.client.post(url, {})
        # Jika kode di views.py tidak menemukan 'page', mungkin akan error
        self.assertNotEqual(response_fail.status_code, 200)

        # Skenario 3: Simulasi request berhasil (asumsi dataset '400' ada)
        # Mengirim data via POST sesuai kebutuhan views.py
        response_success = self.client.post(url, {
            'require_score': '400',
            'page': '1'
        })
        self.assertEqual(response_success.status_code, 200)
        self.assertEqual(response_success.json()['status'], 'success')
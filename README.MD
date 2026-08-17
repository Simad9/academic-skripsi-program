# Program Skripsi
---

## Deskripsi Singkat

Projek Skripsi milik Wijdan, bidang **Bioinformatika**, dengan judul:

> **DETEKSI KOMUNITAS TUMPANG TINDIH PADA JARINGAN INTERAKSI PROTEIN KANKER GINJAL BERBASIS GRAPH NEURAL NETWORK**

Sistem mendeteksi komunitas tumpang tindih (overlapping community) pada jaringan interaksi protein (PPI) yang diambil dari **STRING-DB**. Model yang digunakan adalah **NOCD** (Neural Overlapping Community Detection) — gabungan **GNN** (Graph Neural Network) dengan **BP** (Bernoulli-Poisson). Aplikasi dibangun dengan **Django** sebagai backend (REST API) dan **React** sebagai frontend.

## Tech Stack

| Bagian | Teknologi |
|--------|-----------|
| Backend | Django 5.2 + REST API (JSON) |
| Frontend | React 19 + Vite |
| Styling | Tailwind CSS 4 + DaisyUI 5 |
| Model GNN | PyTorch + NOCD (Graph Neural Network + Bernoulli-Poisson) |
| Graph / Evaluasi | NetworkX, cdlib (modularity, density, dsb.) |
| Data Interaksi Protein | STRING-DB (STRING-db API & Web TSV) |
| Visualisasi | Plotly.js (grafik jaringan / komunitas) |

## Arsitektur Folder

```
program-skripsi/
├── temp/
│   └── overlapping-community-detection/   # Workspace uji coba & pembuatan model GNN
│                                          # (notebook skripsi, eksperimen, tuning, dataset)
├── venv/                                  # Python environment khusus projek ini
├── nocd/                                  # Projek utama (Django + Frontend)
│   ├── frontend/                          # Frontend React (Vite + Tailwind + DaisyUI + Plotly)
│   ├── main/                              # App Django (views/API, templates, static)
│   │   └── code_ml/                       # Kode ML/DP
│   │       ├── gnn_lib/                   # Library GNN NOCD (gcn, decoder, train, metrics)
│   │       ├── models/                    # Model GNN terlatih (*.pth)
│   │       ├── deteksiKomunitas.py        # Proses deteksi komunitas
│   │       ├── enrichmentAnalysis.py      # Proses enrichment analysis
│   │       └── stringdb.py                # Fetch data dari STRING-DB
│   ├── nocd/                              # Config Django (settings, urls, wsgi/asgi)
│   ├── uploads/                           # File untuk demo aplikasi (dataset, model, hasil)
│   ├── manage.py
│   └── package.json                       # Skrip npm (dev, django, react, tailwind)
├── requirements.txt                       # Dependensi Python (versi bisa berbeda)
└── README.MD
```

## API Endpoint

Semua endpoint menerima **POST**, di-backend `main/urls.py`.

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| POST | `/api/pilih-dataset` | Upload dataset (Excel) → fetch gambar interaksi dari STRING-DB + detail dataset |
| POST | `/api/tabel-dataset` | Tampilkan dataset berupa tabel dengan pagination |
| POST | `/api/input-model` | Upload model GNN (*.pth) → kembalikan config model |
| POST | `/api/deteksi-komunitas` | Deteksi komunitas tumpang tindih (input model + threshold + require_score) → hasil & evaluasi |
| POST | `/api/enrichment-analysis` | Enrichment analysis dari daftar gene pada komunitas |

## How To Run

### Untuk Developer (Wijdan)

1. Aktifkan environment: `act`
2. Masuk ke folder projek: `cd nocd`
3. Jalankan server + frontend: `npm run dev` (menjalankan Django + React)
4. Buka di browser: `http://127.0.0.1:8000/`

> Skrip `npm run dev` ada di `nocd/package.json`. Ada juga `npm run dev:tailwind` untuk ikut watch Tailwind, `npm run django`, dan `npm run react`.

### Untuk User

```bash
# 1. Clone repo
git clone https://github.com/Simad9/academic-skripsi-program.git

# 2. Masuk ke folder
cd program-skripsi

# 3. Buat environment (Python 3.11)
python -3.11 -m venv venv

# 4. Aktifkan environment
.\venv\Scripts\activate

# 5. Install semua library
pip install -r requirements_v2.txt
# NOTE: sesuaikan nama filenya (requirements_vX.txt), karena library diupdate kadang-kadang

# 6. Masuk ke folder projek
cd nocd

# 7. Jalankan server + frontend
npm run dev

# 8. Buka di browser
http://127.0.0.1:8000/
```

### Bonus (Developer Wijdan): Alias `act`

Biar gampang aktifkan environment:

```powershell
notepad $PROFILE
```

Lalu tambahkan:
```powershell
set-alias act .\venv\Scripts\activate
```

Setelah itu setiap mau aktifkan environment cukup ketik `act`.

## Cara Jalankan Model GNN Terpisah

Workspace uji coba & pembuatan model ada di `temp/overlapping-community-detection/`:

1. Masuk ke folder: `cd temp/overlapping-community-detection`
2. Aktifkan environment khususnya: `.\venv\Scripts\activate` (atau `.venv` folder)
3. Buka notebook skripsi (`skripsi*.ipynb`) di Jupyter untuk training / eksperimen
4. Untuk detail lebih lanjut baca `README.md` di dalam folder tersebut

> Repo ini adalah modifikasi dari repo milik [Shchur](https://github.com/shchur/overlapping-community-detection) yang dirombak untuk skripsi. \
> Kebaruan : Pada penelitan tersebut Supervise sehingga saya ubah menjadi Unsupervise dengan ketentuan

## Catatan Versi

- **Python**: 3.11
- **Torch**: 2.9.1
- **Django**: 5.2.9
- **React**: 19 + Vite 7
- **Dependensi Python**: `requirements.txt`

## Referensi

- Repo asli: https://github.com/shchur/overlapping-community-detection
- Jurnal: https://drive.google.com/file/d/1lPQqCwhOHDnfmLE4TcCrrSQRXOzfZYT6/view?usp=sharing
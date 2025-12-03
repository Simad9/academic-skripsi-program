# Program Skripi
---
Program skripsi milik Wijdan \
Bioinformatika tentang GNN di terapkan di Django sebagai FE nya nanti \

### Penjelasan Sederhana Folder
- `venv` = environtment khusus untuk ini
- `nocd` = program django dan tampilannya
- `sumber` = sumber ML/DP

### Tech Stack
- Django
- Tailwind 
- DaisyUI

### Library ML/DP
- pytorch

### How To Start Project for Developer (Wijdan)
- `act` atau aktifkan environemtn dulu
- `cd nocd` masuk ke folder nocd, mengaktifkan command npm
- `npm run dev` menjalankan server python dan tailwindcss

### How to start project for User
- `git clone https://github.com/Simad9/program-skripsi.git` ~ untuk clone repo
- `cd "nama-project"` disini `cd program-skripsi` ~ masuk ke folder
- `python -3.11 -m venv venv` saya menggunakan versi 3.11 untuk environmentnya ~ membuat environtment
- `.\venv\Scripts\activate` ~ aktifkan environtment
- BONUS = saya kasih alias untuk mengaktifkan environtment
- BONUS = `notepad $PROFILE` lalu masukan `set-alias act .\venv\Scripts\activate` sehingga setiap mau aktifkan cukup ketik `act` saja
- `pip install -r requirements.txt` ~ install semua library yang ada di requirements.txt
- NOTES = silahkan sesuaikan nama filenya `requirements_vx.txt`, karena library akan diupdate kalo ingat
- `cd nocd` ~ masuk ke folder nocd
- `npm run dev` ~ menjalankan server python dan tailwindcss
- Silahkan jalankan di browser `http://127.0.0.1:8000/`
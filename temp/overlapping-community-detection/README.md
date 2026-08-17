# Overlapping Community Detection with Graph Neural Networks
---
Perombakan repo milik Pak [Shchur](https://github.com/shchur), untuk skripsi saya \
Repo aslinya ada dibawaha, silahkan cek aja repo aslinya untuk melihat code aslinya.

### GITHUB NYA
https://github.com/shchur/overlapping-community-detection

### JOURNAL NYA
https://drive.google.com/file/d/1lPQqCwhOHDnfmLE4TcCrrSQRXOzfZYT6/view?usp=sharing

### Judul Skripsi
Deteksi Komunitas Tumpang Tindih Pada Jaringan Interkasi Protein Kanker Ginjal Menggunakan Pendekatan Graph Neural Network

### Alasan
Alasan menggunakan repo ini adalah : 
1. Base code yang dimana mampu melakukan Deteksi Komunitas Tumpang Tindih
2. Sudah menggunakan GNN itu sendiri
3. Menurut jurnal sudah mampu menghasilkan hasil yang optimal


### Catatan
Repo ini, menggunakan model `NOCD` (Neural Overlapping Comunity Detection) \
Dimana menggabungkan model `GNN` (Graph Neural Network) dengan `BP` (Bernaouli Poisson)

### Struktur Folder Saya
`data` = folder data bawaan repo \
`dataset` = folder uji coba saya + dataset saya \
`images` = folder hasil image untuk visualisasi STRINGDB\
`nocd` = folder model bawaan (yang nanti akan saya ubah)\
`result` = folder hasil coba coba
`skripsi.ipynb` = file untuk skripsi sekkaligus belajar
`...sisanya...` = bawaan dari repo sebelumnya

### Catatan Lainnya saat memahami kode
- Gunakan Modularity untuk mengetahui komunitas itu kuat atau engga, dan mengetahui apakah overlaping atau engga.
- Setelah itu baru pake Density untuk mengetahui 1 komunitas itu.

### Dapat Journal tambahan
- SEMI-SUPERVISED CLASSIFICATION WITH GRAPH CONVOLUTIONAL NETWORKS - Kipf and Welling 2017 ~ https://arxiv.org/pdf/1609.02907
- Modularity measure of networks with overlapping communities ~ https://arxiv.org/pdf/0910.5072

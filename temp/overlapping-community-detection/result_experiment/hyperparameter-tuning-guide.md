# 🎯 Panduan Lengkap Hyperparameter Tuning

## 📋 Step-by-Step Tuning Process

### **FASE 1: Baseline Experiment (Cari Ground Truth)**

#### Step 1.1: Mulai dengan Konfigurasi Konservatif
```python
# Experiment 1: Baseline
K = 5                # Mulai dengan komunitas sedikit
lr = 1e-3            # Learning rate sedang
max_epochs = 3000    # Cukup waktu untuk converge
weight_decay = 1e-3  # Regularisasi ringan
dropout = 0.2        # Dropout rendah
threshold_dataset = 600
```

**Target:**
- ✅ Validation loss turun stabil
- ✅ Training loss < 0.2
- ✅ Q_overlap > 0.1

---

### **FASE 2: Tuning Jumlah Komunitas (K)**

#### Step 2.1: Sweep K dari kecil ke besar
```python
# Experiment 2-6: Variasi K
for K in [3, 5, 8, 10, 15]:
    lr = 1e-3
    max_epochs = 3000
    weight_decay = 1e-3
    dropout = 0.2
```

**Cara Evaluasi:**
- **K terlalu kecil**: Q rendah, komunitas terlalu general
- **K terlalu besar**: Q turun, overfitting, banyak komunitas kosong
- **K optimal**: Q maksimal, komunitas balance

**Kriteria K Bagus:**
| Metrik | Target |
|--------|--------|
| Q_overlap | **Maksimal** (tertinggi di range K) |
| Validation Loss | Stabil dan rendah |
| Node per Community | > 50 nodes (tidak ada komunitas terlalu kecil) |
| Overlap Rate | 10-30% nodes in multiple communities |

---

### **FASE 3: Tuning Learning Rate (lr)**

#### Step 3.1: Gunakan K terbaik dari Fase 2
```python
# Experiment 7-11: Variasi lr
K = 8  # Dari hasil terbaik Fase 2
for lr in [1e-4, 5e-4, 1e-3, 5e-3, 1e-2]:
    max_epochs = 3000
    weight_decay = 1e-3
    dropout = 0.2
```

**Cara Evaluasi:**
- **lr terlalu kecil**: Training lambat, butuh banyak epoch
- **lr terlalu besar**: Training loss tidak stabil, validation loss naik-turun
- **lr optimal**: Converge cepat dan stabil

**Kriteria lr Bagus:**
| Kondisi | Indikator |
|---------|-----------|
| Training Loss | Turun smooth tanpa spike |
| Converge Speed | Validation loss stabil < 1000 epoch |
| Final Q | Lebih tinggi dari baseline |

---

### **FASE 4: Tuning Weight Decay (Regularisasi)**

#### Step 4.1: Fine-tune regularisasi
```python
# Experiment 12-16: Variasi weight_decay
K = 8
lr = 1e-3  # Dari hasil terbaik Fase 3
for weight_decay in [0, 1e-4, 1e-3, 5e-3, 1e-2]:
    max_epochs = 3000
    dropout = 0.2
```

**Cara Evaluasi:**
- **weight_decay = 0**: Risiko overfitting tinggi
- **weight_decay terlalu besar**: Underfitting, model tidak belajar
- **weight_decay optimal**: Validation loss rendah, tidak overfit

**Kriteria weight_decay Bagus:**
| Metrik | Target |
|--------|--------|
| Train vs Val Loss | Gap < 0.05 (tidak overfit) |
| Q_overlap | Tidak turun drastis |
| Model Complexity | Weight tidak terlalu besar/kecil |

---

### **FASE 5: Tuning Dropout**

#### Step 5.1: Atur dropout untuk generalisasi
```python
# Experiment 17-21: Variasi dropout
K = 8
lr = 1e-3
weight_decay = 1e-3  # Dari hasil terbaik Fase 4
for dropout in [0.0, 0.1, 0.2, 0.3, 0.5]:
    max_epochs = 3000
```

**Cara Evaluasi:**
- **dropout = 0**: Model bisa overfit
- **dropout terlalu tinggi**: Model tidak bisa belajar (underfit)
- **dropout optimal**: Balance antara train dan validation

**Kriteria dropout Bagus:**
| Kondisi | Indikator |
|---------|-----------|
| Overfitting Check | Val loss tidak naik saat train loss turun |
| Training Stability | Loss tidak terlalu noisy |
| Final Performance | Q tinggi, validation loss rendah |

---

### **FASE 6: Tuning Dataset Threshold**

#### Step 6.1: Eksperimen dengan kualitas edge
```python
# Experiment 22-26: Variasi threshold
K = 8
lr = 1e-3
weight_decay = 1e-3
dropout = 0.2  # Dari hasil terbaik Fase 5
for threshold in [400, 500, 600, 700, 800]:
    file_dataset = f"images/stringdb_result_{threshold}.tsv"
```

**Cara Evaluasi:**
- **threshold rendah**: Banyak edge noise, komunitas kabur
- **threshold tinggi**: Edge terlalu sedikit, graf sparse
- **threshold optimal**: Q maksimal, struktur komunitas jelas

---

## ✅ Kriteria Hyperparameter "BAGUS"

### 1. **Validation Loss**
```
✅ BAGUS: < 0.15
⚠️  OK: 0.15 - 0.25
❌ BURUK: > 0.25
```

### 2. **Overlapping Modularity (Q)**
```
✅ EXCELLENT: Q > 0.4
✅ BAGUS: Q > 0.3
⚠️  OK: Q > 0.2
❌ BURUK: Q < 0.1 atau Q < 0
```

### 3. **Training Stability**
```python
# Hitung setelah training
loss_std = np.std(validation_losses[-50:])  # Std 50 epoch terakhir

✅ BAGUS: loss_std < 0.01 (stabil)
⚠️  OK: loss_std < 0.05
❌ BURUK: loss_std > 0.05 (tidak stabil)
```

### 4. **Overfitting Check**
```python
gap = validation_loss - training_loss

✅ BAGUS: gap < 0.05 (tidak overfit)
⚠️  OK: gap < 0.1
❌ BURUK: gap > 0.15 (overfit parah)
```

### 5. **Convergence Speed**
```
✅ BAGUS: Stabil dalam < 1000 epoch
⚠️  OK: Stabil dalam < 2000 epoch
❌ BURUK: Tidak stabil setelah 3000 epoch
```

### 6. **Community Quality**
```python
# Cek distribusi node per komunitas
nodes_per_community = (Alpha > 0.3).sum(axis=0)

✅ BAGUS: Semua komunitas punya > 50 nodes
⚠️  OK: Mayoritas komunitas punya > 30 nodes
❌ BURUK: Banyak komunitas < 10 nodes (komunitas mati)
```

---

## 📊 Template Tracking Experiment

```python
# Simpan hasil setiap experiment
results = []

experiment = {
    'id': percobaan,
    'K': K,
    'lr': lr,
    'weight_decay': weight_decay,
    'dropout': dropout,
    'threshold': treshold_dataset,
    'final_train_loss': train_loss_current,
    'final_val_loss': val_loss,
    'Q_overlap': Q_overlap_score,
    'converge_epoch': epoch,
    'avg_nodes_per_comm': (Alpha > 0.3).sum(axis=0).mean(),
    'overlap_rate': ((Alpha > 0.3).sum(axis=1) > 1).mean()
}
results.append(experiment)

# Simpan ke CSV
import pandas as pd
df_results = pd.DataFrame(results)
df_results.to_csv('hyperparameter_tuning_results.csv', index=False)
```

---

## 🎯 Best Practices

### 1. **Urutan Tuning yang Disarankan**
```
K → lr → weight_decay → dropout → threshold
```
Mulai dari yang paling impact (K) ke yang least impact (threshold).

### 2. **Grid Search vs Random Search**
- **Grid Search**: Untuk tuning awal (Fase 1-3)
- **Random Search**: Untuk fine-tuning (Fase 4-6)

### 3. **Early Stopping**
```python
patience = 20  # Tunggu 20 epoch sebelum stop
```
Jangan terlalu agresif, beri model waktu untuk recover.

### 4. **Learning Rate Scheduling**
```python
# Optional: Gunakan scheduler
from torch.optim.lr_scheduler import ReduceLROnPlateau
scheduler = ReduceLROnPlateau(opt, mode='min', factor=0.5, patience=10)
```

### 5. **Multiple Runs**
Jalankan 3-5 kali dengan random seed berbeda, ambil rata-rata:
```python
for seed in [42, 123, 456, 789, 2024]:
    torch.manual_seed(seed)
    np.random.seed(seed)
    # ... training code ...
```

---

## 🚀 Quick Start: Best Hyperparameter Ranges

Berdasarkan literatur GNN untuk community detection:

| Parameter | Range to Try | Typical Best |
|-----------|--------------|--------------|
| **K** | 3, 5, 8, 10, 15, 20 | 8-10 untuk protein network |
| **lr** | 1e-4 to 1e-2 | 5e-4 to 1e-3 |
| **weight_decay** | 0 to 1e-2 | 1e-3 to 5e-3 |
| **dropout** | 0.0 to 0.5 | 0.2 to 0.3 |
| **threshold** | 400 to 900 | 600-700 (high confidence) |
| **max_epochs** | 2000-5000 | 3000 |
| **hidden_sizes** | [64], [128], [256] | [128] |

---

## 🔍 Diagnostic Checklist

Jika hasil masih buruk, cek:

- [ ] **Data Quality**: Apakah graf terlalu sparse atau dense?
- [ ] **Normalization**: Coba skip normalization atau ubah metode
- [ ] **Alpha Calculation**: Gunakan softmax vs threshold
- [ ] **Loss Function**: Balance loss membantu?
- [ ] **Architecture**: Coba tambah layer GNN atau ubah hidden size
- [ ] **Batch Size**: Untuk stochastic loss, coba ubah batch size

---

## 📝 Contoh Hasil yang Bagus

```
--- Hyperparameter (BEST) ---
K: 8
lr: 0.001
max_epochs: 3000
weight_decay: 0.001
dropout: 0.2
threshold_dataset: 600

--- Training Progress ---
Epoch 0: Training loss: 0.0000 | Validation loss: 0.6169
Epoch 500: Training loss: 0.1523 | Validation loss: 0.1489
Epoch 1000: Training loss: 0.0987 | Validation loss: 0.0995
Epoch 1500: Training loss: 0.0854 | Validation loss: 0.0891
Breaking due to early stopping at epoch 1650

--- Final Evaluation ---
Skor Overlapping Modularity: 0.3542 ✅
Validation Loss: 0.0891 ✅
Overfitting Gap: 0.0037 ✅
Average Nodes per Community: 127.4 ✅
Overlap Rate: 18.3% ✅
```

Ini adalah contoh hyperparameter yang **SANGAT BAGUS**! 🎉

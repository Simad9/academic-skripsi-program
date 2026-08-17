## Hasil Pencatatan Terkait Dataset
Tujuan : Untuk mencari tau apakah datasetnya oke atau tidak digunakan untuk peneltiian ini

## Dataset yang digunakan
Dataset yang digunakan adalah 400 karena :
- Modularity Lebih Rendah = Lebih Banyak Overlap (Penting!)
- Peningkatan Average Degree (Kekayaan Informasi)
- MPenurunan Low Degree Nodes

Dari alasan itu dapat disimpulkan untuk overlaping membutuhkan density yang cukup besar, agar overlapingnya dapat.


---
### Required Score : 400
```
================================================================================
🔬 DATASET DIAGNOSTIC REPORT
================================================================================

📊 1. BASIC STATISTICS
------------------------------------------------------------
Nodes: 585
Edges: 11812
Density: 0.069149

📊 2. DEGREE DISTRIBUTION
------------------------------------------------------------
Average Degree: 25.30
Median Degree: 16.30
Min Degree: 0
Max Degree: 225
Std Degree: 26.70

⚠️  Isolated nodes (degree=0): 0 (0.0%)
⚠️  Low degree nodes (<3): 61 (10.4%)

📊 3. CONNECTIVITY ANALYSIS
------------------------------------------------------------
Connected Components: 1
Largest CC Size: 585 (100.0%)

📊 4. EDGE WEIGHT DISTRIBUTION
------------------------------------------------------------
Min Weight: 0.4
Max Weight: 1.0
Mean Weight: 0.6
Median Weight: 0.6
Std Weight: 0.2

📊 5. CLUSTERING COEFFICIENT (Sample)
------------------------------------------------------------
Average Clustering Coefficient: 0.2988

📊 6. PRELIMINARY COMMUNITY STRUCTURE
------------------------------------------------------------
Detected Communities (Louvain): 5
Average Community Size: 117.0
Preliminary Modularity: 0.3496

================================================================================
📋 OVERALL ASSESSMENT
================================================================================
✅ Average degree >= 10: GOOD
✅ Graph is connected: GOOD
✅ No isolated nodes: GOOD
⚠️  Moderate clustering coefficient: OK
❌ Low weight variation: POOR
✅ Strong community structure: GOOD
✅ Good density range: GOOD

--------------------------------------------------------------------------------
📊 FINAL SCORE: 78.6/100
👍 Dataset Quality: GOOD - Should work well
```

### Required Score : 500
```
================================================================================
🔬 DATASET DIAGNOSTIC REPORT
================================================================================

📊 1. BASIC STATISTICS
------------------------------------------------------------
Nodes: 574
Edges: 8056
Density: 0.048987

📊 2. DEGREE DISTRIBUTION
------------------------------------------------------------
Average Degree: 19.97
Median Degree: 12.42
Min Degree: 1
Max Degree: 194
Std Degree: 22.21

⚠️  Isolated nodes (degree=0): 0 (0.0%)
⚠️  Low degree nodes (<3): 79 (13.8%)

📊 3. CONNECTIVITY ANALYSIS
------------------------------------------------------------
Connected Components: 1
Largest CC Size: 574 (100.0%)

📊 4. EDGE WEIGHT DISTRIBUTION
------------------------------------------------------------
Min Weight: 0.5
Max Weight: 1.0
Mean Weight: 0.7
Median Weight: 0.7
Std Weight: 0.2

📊 5. CLUSTERING COEFFICIENT (Sample)
------------------------------------------------------------
Average Clustering Coefficient: 0.3246

📊 6. PRELIMINARY COMMUNITY STRUCTURE
------------------------------------------------------------
Detected Communities (Louvain): 6
Average Community Size: 95.7
Preliminary Modularity: 0.3931

================================================================================
📋 OVERALL ASSESSMENT
================================================================================
✅ Average degree >= 10: GOOD
✅ Graph is connected: GOOD
✅ No isolated nodes: GOOD
✅ High clustering coefficient: GOOD
❌ Low weight variation: POOR
✅ Strong community structure: GOOD
✅ Good density range: GOOD

--------------------------------------------------------------------------------
📊 FINAL SCORE: 85.7/100
🎉 Dataset Quality: EXCELLENT - Ready for community detection
```

### Required Score : 600
```
================================================================================
🔬 DATASET DIAGNOSTIC REPORT
================================================================================

📊 1. BASIC STATISTICS
------------------------------------------------------------
Nodes: 563
Edges: 5388
Density: 0.034058

📊 2. DEGREE DISTRIBUTION
------------------------------------------------------------
Average Degree: 15.19
Median Degree: 9.10
Min Degree: 1
Max Degree: 162
Std Degree: 17.95

⚠️  Isolated nodes (degree=0): 0 (0.0%)
⚠️  Low degree nodes (<3): 128 (22.7%)

📊 3. CONNECTIVITY ANALYSIS
------------------------------------------------------------
Connected Components: 1
Largest CC Size: 563 (100.0%)

📊 4. EDGE WEIGHT DISTRIBUTION
------------------------------------------------------------
Min Weight: 0.6
Max Weight: 1.0
Mean Weight: 0.8
Median Weight: 0.8
Std Weight: 0.1

📊 5. CLUSTERING COEFFICIENT (Sample)
------------------------------------------------------------
Average Clustering Coefficient: 0.3437

📊 6. PRELIMINARY COMMUNITY STRUCTURE
------------------------------------------------------------
Detected Communities (Louvain): 8
Average Community Size: 70.4
Preliminary Modularity: 0.4480

================================================================================
📋 OVERALL ASSESSMENT
================================================================================
✅ Average degree >= 10: GOOD
✅ Graph is connected: GOOD
✅ No isolated nodes: GOOD
✅ High clustering coefficient: GOOD
❌ Low weight variation: POOR
✅ Strong community structure: GOOD
✅ Good density range: GOOD

--------------------------------------------------------------------------------
📊 FINAL SCORE: 85.7/100
🎉 Dataset Quality: EXCELLENT - Ready for community detection
```

### Required Score : 700
```
================================================================================
🔬 DATASET DIAGNOSTIC REPORT
================================================================================

📊 1. BASIC STATISTICS
------------------------------------------------------------
Nodes: 524
Edges: 3683
Density: 0.026878

📊 2. DEGREE DISTRIBUTION
------------------------------------------------------------
Average Degree: 12.12
Median Degree: 7.51
Min Degree: 1
Max Degree: 128
Std Degree: 14.56

⚠️  Isolated nodes (degree=0): 0 (0.0%)
⚠️  Low degree nodes (<3): 143 (27.3%)

📊 3. CONNECTIVITY ANALYSIS
------------------------------------------------------------
Connected Components: 3
Largest CC Size: 520 (99.2%)
⚠️  WARNING: Graph is disconnected!

📊 4. EDGE WEIGHT DISTRIBUTION
------------------------------------------------------------
Min Weight: 0.7
Max Weight: 1.0
Mean Weight: 0.9
Median Weight: 0.9
Std Weight: 0.1

📊 5. CLUSTERING COEFFICIENT (Sample)
------------------------------------------------------------
Average Clustering Coefficient: 0.3519

📊 6. PRELIMINARY COMMUNITY STRUCTURE
------------------------------------------------------------
Detected Communities (Louvain): 11
Average Community Size: 47.6
Preliminary Modularity: 0.4946

================================================================================
📋 OVERALL ASSESSMENT
================================================================================
✅ Average degree >= 10: GOOD
❌ Graph has 3 components: POOR
✅ No isolated nodes: GOOD
✅ High clustering coefficient: GOOD
❌ Low weight variation: POOR
✅ Strong community structure: GOOD
✅ Good density range: GOOD

--------------------------------------------------------------------------------
📊 FINAL SCORE: 71.4/100
👍 Dataset Quality: GOOD - Should work well
```
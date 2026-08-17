# Catat Best Conifg dari skripsi_sesuai-jurnal.py
---
## Experiment 1
- k = 12
- lr = 0.001
- epochs = 3000
- wd = 0.001
- dropout = 0.2
- theta = 1.0
### Final Result
- Train Completed 2325 epochs in 925s
- Final Train Loss: 0.0982
- Final Val Loss: 0.0865
- Q_overlap: 0.8899
- Avg Size: 6862.5
- Overlapping nodes: 11894 (99.3%)
- Avg Memberships/node: 9.37

## Hypermarameter Search
### Configuration 1/8
#### Experemint 1
- k = 10
- lr = 0.001
- epochs = 3000
- wd = 0.001
- dropout = 0.2
- theta = 1.0
#### Final Result
- Train Completed 2600 epochs in 864s
- Final Train Loss: 0.1044
- Final Val Loss: 0.0923
- Q_overlap: 0.8899
- Avg Size: 6889.2
- Overlapping nodes: 11909 (99.4%)
- Avg Memberships/node: 7.86

### Configuration 2/8
#### Experemint 2
- k = 12
- lr = 0.001
- epochs = 3000
- wd = 0.001
- dropout = 0.2
- theta = 1.0
#### Final Result
- Train Completed 2275 epochs in 738s
- Final Train Loss: 0.1030
- Final Val Loss: 0.0890
- Q_overlap: 0.8899
- Avg Size: 6784.7
- Overlapping nodes: 11901 (99.3%)
- Avg Memberships/node: 9.44

### Configuration 3/8
#### Experemint 3
- k = 15
- lr = 0.001
- epochs = 3000
- wd = 0.001
- dropout = 0.2
- theta = 1.0 
#### Final Result
- Train Completed 2050 epochs in 678s
- Final Train Loss: 0.0990
- Final Val Loss: 0.0847
- Q_overlap: 0.8899
- Avg Size: 6983.7
- Overlapping nodes: 11905 (99.3%)
- Avg Memberships/node: 11.82

### Configuration 4/8
#### Experemint 4
- k = 12
- lr = 0.005
- epochs = 3000
- wd = 0.001
- dropout = 0.2
- theta = 1.0 
#### Final Result
- Train Completed 2000 epochs in 634s
- Final Train Loss: 0.0976
- Final Val Loss: 0.0853
- Q_overlap: 0.8899
- Avg Size: 6898.8
- Overlapping nodes: 11946 (99.7%)
- Avg Memberships/node: 9.45

### Configuration 5/8
#### Experemint 5
- k = 12
- lr = 0.001
- epochs = 3000
- wd = 0.005
- dropout = 0.2
- theta = 1.0 
#### Final Result
- Train Completed 2350 epochs in 763s
- Final Train Loss: 0.0960
- Final Val Loss: 0.0845
- Q_overlap: 0.8899
- Avg Size: 6735.4
- Overlapping nodes: 11953 (99.7%)
- Avg Memberships/node: 9.41

### Configuration 6/8
#### Experemint 6
- k = 12
- lr = 0.001
- epochs = 3000
- wd = 0.001
- dropout = 0.1
- theta = 1.0 
#### Final Result
- Train Completed 3001 epochs in 960s
- Final Train Loss: 0.0950
- Final Val Loss: 0.0847
- Q_overlap: 0.8899
- Avg Size: 6844.8
- Overlapping nodes: 11910 (99.4%)
- Avg Memberships/node: 9.35

### Configuration 7/8
#### Experemint 7
- k = 12
- lr = 0.001
- epochs = 3000
- wd = 0.001
- dropout = 0.2
- theta = 0.8 
#### Final Result
- Train Completed 2150 epochs in 688s
- Final Train Loss: 0.1051
- Final Val Loss: 0.0910
- Q_overlap: 0.8899
- Avg Size: 8528.3
- Overlapping nodes: 11959 (99.8%)
- Avg Memberships/node: 10.20

### Configuration 8/8
#### Experemint 8
- k = 12
- lr = 0.001
- epochs = 3000
- wd = 0.001
- dropout = 0.2
- theta = 1.2 
#### Final Result
- Train Completed 2300 epochs in 742s
- Final Train Loss: 0.1031
- Final Val Loss: 0.0901
- Q_overlap: 0.8899
- Avg Size: 5845.2
- Overlapping nodes: 11889 (99.2%)
- Avg Memberships/node: 8.98

## Best Configuration Found
- Q_overlap: 0.8899
- k = 15
- lr = 0.001
- wd (weight_decay) = 0.001
- dropout = 0.2
- theta = 1.0
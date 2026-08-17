import numpy as np

__all__ = [
    'evaluate_modularity',
    'overlapping_modularity',
    'link_modularity'
]

def evaluate_modularity(adj_matrix, membership_matrix, link_membership):
    return {
        'overlapping_modularity': overlapping_modularity(adj_matrix, membership_matrix),
        'link_modulrity': link_modularity(adj_matrix, link_membership),
    }


def overlapping_modularity(adj_matrix: np.ndarray, membership_matrix: np.ndarray) -> float:
    """
    Menghitung Overlapping Modularity (Q_ov) atau Extended Modularity.
    
    Asumsi: membership_matrix adalah matriks biner (N x C),
    di mana N = jumlah node, C = jumlah komunitas.
    
    Q_ov membandingkan jumlah edge di dalam komunitas yang tumpang tindih
    dengan nilai yang diharapkan dalam jaringan acak.
    """
    N = adj_matrix.shape[0]
    C = membership_matrix.shape[1]
    
    # 1. Hitung jumlah total edges (m)
    m = np.sum(adj_matrix) / 2
    if m == 0:
        return 0.0

    # 2. Hitung derajat simpul (k_i)
    degrees = np.sum(adj_matrix, axis=1) # k_i
    
    # 3. Hitung jumlah komunitas tempat setiap simpul berada (O_i)
    O_i = np.sum(membership_matrix, axis=1) # Jumlah komunitas simpul i
    
    Q_ov = 0.0
    
    # Iterasi melalui semua pasangan simpul i dan j
    for i in range(N):
        for j in range(i + 1, N): # Hanya perlu iterasi j > i karena graf tak berarah
            
            if O_i[i] == 0 or O_i[j] == 0:
                # Lewati simpul yang tidak termasuk komunitas manapun
                continue
                
            # Delta (Kontribusi komunitas yang sama)
            # Hitung jumlah komunitas c yang dimiliki bersama oleh i dan j
            shared_communities = np.sum(membership_matrix[i, :] * membership_matrix[j, :])
            
            # Faktor keanggotaan tumpang tindih (1 / (O_i * O_j) * shared_communities)
            factor = shared_communities / (O_i[i] * O_i[j])
            
            # Kontribusi pasangan (i, j) ke Q_ov
            # A_ij - (k_i * k_j) / (2 * m)
            term = adj_matrix[i, j] - (degrees[i] * degrees[j]) / (2 * m)
            
            Q_ov += term * factor

    return Q_ov / m


def link_modularity(adj_matrix: np.ndarray, link_membership: dict) -> float:
    """
    Menghitung Link Modularity (Q_L) atau Modularity Sisi.
    
    Asumsi: link_membership adalah dict, key: tuple edge (i, j),
    value: daftar komunitas tempat sisi (i, j) berada.
    
    Q_L mempartisi sisi/edges alih-alih nodes.
    """
    N = adj_matrix.shape[0]
    m = np.sum(adj_matrix) / 2
    if m == 0:
        return 0.0
        
    degrees = np.sum(adj_matrix, axis=1)

    Q_L = 0.0
    
    # Kumpulkan semua pasangan sisi (i, j) dari matriks adjasensi
    edges = []
    for i in range(N):
        for j in range(i + 1, N):
            if adj_matrix[i, j] == 1:
                edges.append((i, j))
    
    for (i, j) in edges:
        # Dapatkan daftar komunitas tempat sisi (i, j) berada
        communities = link_membership.get((i, j), [])
        
        # Jumlah komunitas tumpang tindih untuk sisi (i, j)
        O_ij = len(communities)
        
        if O_ij == 0:
            continue
            
        # Perhitungan kontribusi sisi untuk setiap komunitas c yang dimiliki
        term_sum = 0.0
        for c in communities:
            # Kontribusi sisi di dalam komunitas c
            # (A_ij - k_i * k_j / (2m)) / O_ij
            
            # NOTE: Dalam implementasi Q_L yang ketat, k_i dan k_j juga diukur
            # hanya untuk koneksi di dalam komunitas c (k_i^c).
            # Di sini, kita menggunakan aproksimasi standar untuk memudahkan.
            
            # Bagian Newman: A_ij - P_ij
            newman_term = adj_matrix[i, j] - (degrees[i] * degrees[j]) / (2 * m)
            
            term_sum += (1 / O_ij) * newman_term
            
        Q_L += term_sum
            
    return Q_L / m
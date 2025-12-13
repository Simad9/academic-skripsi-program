from gprofiler import GProfiler
import ast
import math

def ambil_enrichment_analysis(gene_list):

  # 1. Inisialisasi tool
  gp = GProfiler(return_dataframe=True)

  # 2. Definisikan list gen Anda (contoh: gen terkait siklus sel/kanker)
  gene_list = gene_list

  # 3. Jalankan enrichment analysis (g:GOSt)
  results = gp.profile(
      organism='hsapiens',    # Organisme (hsapiens = Human, mmusculus = Mouse)
      query=gene_list,        # List gen yang mau dianalisis
      sources=['GO:BP', 'GO:MF', 'GO:CC', 'KEGG'], # Sumber data (Biological Process, KEGG, Reactome)
      user_threshold=0.05,    # Ambang batas signifikansi (p-value)
      no_evidences=False      # Set False agar kita bisa lihat gen apa saja yang overlap
  )

  # 5. Persiapkan struktur dictionary penampung
  data_enrichment = {
      "data_bp": [],
      "data_mf": [],
      "data_cc": [],
      "data_kp": []
  }

  # 6. Iterasi setiap baris pada DataFrame 'results'
  for index, row in results.iterrows():
      source = row['source']
      
      # Tentukan kunci kategori berdasarkan source
      category_key = None
      if source == 'GO:BP':
          category_key = 'data_bp'
      elif source == 'GO:MF':
          category_key = 'data_mf'
      elif source == 'GO:CC':
          category_key = 'data_cc'
      elif source == 'KEGG':
          category_key = 'data_kp'
      
      # Jika kategori sesuai dengan yang diinginkan, proses datanya
      if category_key:
          # Hitung -log10 dari p-value
          p_val = row['p_value']
          log10p = -math.log10(p_val) if p_val > 0 else 0
          
          # Ambil list gen (pastikan formatnya list)
          # GProfiler biasanya mengembalikan list, tapi jika dari CSV mungkin perlu diparsing
          gene_list_data = row['intersections']
          if isinstance(gene_list_data, str):
              # Jika terbaca sebagai string "['A', 'B']", kita bersihkan
              gene_list_data = ast.literal_eval(gene_list_data)

          # Buat dictionary item sesuai format yang diminta
          item = {
              "term_id": row['native'],       # ID Term (contoh: GO:00009748)
              "term_name": row['name'],       # Nama Term
              "log10p": f"{log10p:.2f}",      # Format string 2 desimal
              "p_value": f"{p_val:.2e}",      # Format scientific notation
              "gene_count": str(row['intersection_size']), # Jumlah gen yang overlap
              "gene_list": gene_list_data     # List nama gen
          }
          
          # Masukkan ke kategori yang sesuai
          data_enrichment[category_key].append(item)

  return data_enrichment
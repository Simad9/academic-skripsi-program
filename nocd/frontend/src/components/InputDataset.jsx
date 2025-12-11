import { useState, useRef } from 'react';

// Components
import GraphVisualizer from '../components/GraphVisualizerComponent.jsx';
import TableComponent from '../components/TableComponent.jsx';

// API
import { fetchStringDBTableData, fetchStringDBImageData } from '../api/api';

export default function InputDataset() {
  const kosong = null; // Placeholder untuk kondisi kosong
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('file'); // State untuk tab aktif (file atau text)

  // State BARU untuk Data Tabel STRINGDB
  const [tableData, setTableData] = useState(null);
  const [tableLoading, setTableLoading] = useState(false);
  const [tableError, setTableError] = useState(null);
  const [activeResultTab, setActiveResultTab] = useState('Graf'); // State untuk tab hasil (graf/tabel)

  // Ref untuk formFeature (formulir input feature kedua)
  const formFeatureRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset state sebelum memproses
    setLoading(true);
    setError(null);
    // Pertahankan data visual lama saat loading, atau reset: setData(null);

    const form = e.target;
    const formData = new FormData(form);

    // Jika tab input adalah text area, pastikan ada isinya.
    if (activeTab === 'text' && !formData.get('textarea_dataset')) {
      setError("Input Gen tidak boleh kosong.");
      setLoading(false);
      return;
    }

    try {
      const fetchImageData = await fetchStringDBImageData(formData);
      setData(fetchImageData);
      console.log("Data gambar STRINGDB berhasil dimuat:", fetchImageData);
    } catch (err) {
      setError("Gagal berkomunikasi dengan server: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTableTabClick = async () => {
    setActiveResultTab('Tabel'); // Atur tab hasil menjadi 'tabel'
    // Lakukan fetching hanya jika data tabel belum pernah dimuat (null)
    if (tableData === null) {
      setTableLoading(true);
      setTableError(null);

      try {
        // Panggil fungsi API yang sudah dipisah
        const fetchedTableData = await fetchStringDBTableData();

        setTableData(fetchedTableData); // Simpan data
        console.log("Data tabel STRINGDB berhasil dimuat.");

      } catch (err) {
        // Tangani error fetching
        setTableError("Gagal memuat data tabel STRINGDB: " + err.message);
        setTableData(null);

      } finally {
        setTableLoading(false);
      }
    }
  };

  // Fungsi yang dipanggil saat tab "Graf" di klik
  const handleGraphTabClick = () => {
    setActiveResultTab('Graf');
  };

  // Tentukan path gambar yang akan ditampilkan. Gunakan ImageGraph default jika data.img_path null
  const displayImagePath = data && data.img_path ? data.img_path : "  https://placehold.co/500x500?text=No+Image+Available";

  return (
    <div className="bg-base-100 p-5 flex-col gap-4 justify-start rounded-xl">
      <h1 className="font-montserrat font-semibold text-xl mb-3">
        1. Input Dataset
      </h1>
      <section className="flex gap-4 lg:flex-row flex-col">
        <section className="w-full">
          {/* Input File / Text */}
          <div className="tabs tabs-box">

            {/* Tab Upload File */}
            <input
              type="radio"
              name="inputan"
              className="tab"
              aria-label="Upload File"
              checked={activeTab === 'file'}
              onChange={() => setActiveTab('file')}
            />
            <div className="tab-content bg-base-100 border-base-300 p-6">
              <form id="upload-form" onSubmit={handleSubmit}>
                <fieldset className="fieldset w-full">
                  <legend className="fieldset-legend ms-2">
                    Input File Dataset (.xlsx)
                  </legend>
                  <input
                    type="file"
                    name="file_dataset"
                    className="file-input file-input-ghost w-full"
                    accept=".xlsx"
                    disabled={loading} // Nonaktifkan saat loading
                    required // File wajib diunggah
                  />
                </fieldset>
                <button type="submit" className="btn bg-nocd text-white w-full mt-4" disabled={loading}>
                  {loading && activeTab === 'file' ? 'Memproses...' : 'Proses File'}
                </button>
              </form>
            </div>

            {/* Tab Input Gen */}
            <input
              type="radio"
              name="inputan"
              className="tab"
              aria-label="Input Gen"
              checked={activeTab === 'text'}
              onChange={() => setActiveTab('text')}
            />
            <div className="tab-content bg-base-100 border-base-300 p-6">
              <form id="input-gen-form" onSubmit={handleSubmit}>
                <fieldset className="fieldset w-full">
                  <legend className="fieldset-legend ms-2">
                    Input Gen (max 2000 gen)
                  </legend>
                  <textarea
                    name="textarea_dataset"
                    className="textarea h-24 rounded-xl w-full"
                    placeholder="TP53, ABC, EDFT, ..."
                    disabled={loading} // Nonaktifkan saat loading
                    required // Text area wajib diisi
                  />
                </fieldset>
                <button type="submit" className="btn bg-nocd text-white w-full mt-4" disabled={loading}>
                  {loading && activeTab === 'text' ? 'Memproses...' : 'Proses Gen'}
                </button>
              </form>
            </div>
          </div>

          {/* Form Input Feature (Dibutuhkan setelah proses berhasil) = Ini hidden dulu , nanti kasih "data &&"" */}
          {kosong && (
            <div id="upload-feature" className="w-full mt-4" ref={formFeatureRef}>
              <form> {/* Tambahkan form jika ini adalah pengiriman terpisah */}
                <fieldset className="fieldset w-full">
                  <legend className="fieldset-legend ms-2">
                    Input File Feature Gen (Opsional)
                  </legend>
                  <input
                    type="file"
                    className="file-input file-input-ghost w-full"
                    accept=".xlsx"
                  />
                </fieldset>
                <button type="submit" className="btn bg-nocd text-white w-full mt-4">
                  Terapkan Sebagai Data
                </button>
              </form>
            </div>
          )}
        </section>

        {/* Visualisasi dan Hasil */}
        <section className="w-full">
          {/* Menampilkan Loader jika loading true */}
          {loading &&
            <div className="skeleton h-[500px] w-full">
            </div>
          }

          {/* Menampilkan Error jika ada */}
          {error && (
            <div role="alert" className="alert alert-error">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{error}</span>
            </div>
          )}

          {/* Tampilan Hasil Utama (Hanya jika tidak loading dan tidak ada error) */}
          {!loading && !error && (
            <div className="tabs tabs-box w-full">

              {/* TAB GRAF */}
              <input
                type="radio"
                name="hasil"
                className="tab"
                aria-label="Graf"
                checked={activeResultTab === 'Graf'} // Kontrol tab menggunakan state
                onChange={handleGraphTabClick} // Panggil handler
              />
              {activeResultTab === 'Graf' && ( // Tampilkan konten hanya jika tab aktif
                <div className="tab-content bg-base-100 border-base-100 p-6 mt-2">
                  {/* Menggunakan GraphVisualizerComponent */}
                  <GraphVisualizer imgPath={displayImagePath} />
                </div>
              )}
              <div className="tab-content bg-base-100 border-base-100 p-6 mt-2">
                {/* Menggunakan GraphVisualizerComponent */}
                <GraphVisualizer imgPath={displayImagePath} />
              </div>

              {/* TAB TABEL */}
              <input type="radio" name="hasil" className="tab" aria-label="Tabel" checked={activeResultTab === 'Tabel'} onChange={handleTableTabClick} />
              {activeResultTab === 'Tabel' && ( // Tampilkan konten hanya jika tab aktif
                <div className="tab-content bg-base-100 border-base-100 p-6 mt-2">
                  <div className="overflow-x-auto h-[507px] w-full">
                    {/* Menampilkan Loader Khusus Tabel */}
                    {tableLoading && (
                      <div className="flex justify-center items-center h-full w-full">
                        <span className="loading loading-spinner loading-lg me-3"></span>
                        <span className="skeleton skeleton-text">Mengambil Data Tunggu Sebentar</span>
                      </div>
                    )}

                    {/* Menampilkan Error Khusus Tabel */}
                    {tableError && (
                      <div role="alert" className="alert alert-warning">
                        <span>{tableError}</span>
                      </div>
                    )}

                    {/* Menampilkan Tabel jika data tersedia */}
                    {!tableLoading && !tableError && tableData && (
                      <div>
                        <TableComponent tableData={tableData} />
                        <div className="join">
                          <button className="join-item btn">«</button>
                          <button className="join-item btn">Page 1</button>
                          <button className="join-item btn">»</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      </section>
    </div>
  );
}

// Catatan: Pastikan Anda juga sudah memindahkan logika Panzoom ke GraphVisualizerComponent.jsx
// dan logika tabel ke TableComponent.jsx seperti yang dijelaskan di jawaban sebelumnya.
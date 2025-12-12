import { useState, useRef } from 'react';

// Components
import GraphVisualizer from './molekul/GraphVisualizerComponent.jsx';
import TableComponent from './molekul/TableComponent.jsx';
import ButtonAtom from './atom/ButtonAtom.jsx';

// API
import { fetchStringDBImageData } from '../api/api';

export default function InputDataset() {
  const kosong = null; // Placeholder untuk kondisi kosong
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  // Tentukan path gambar yang akan ditampilkan. Gunakan ImageGraph default jika data.img_path null
  const displayImagePath = data && data.img_path ? data.img_path : "  https://placehold.co/500x500?text=No+Image+Available";

  return (
    <>
      <h1 className="text-2xl font-bold font-poppins mb-5">Input Dataset</h1>

      {/* Main Content */}
      <main className="flex gap-4 lg:flex-row flex-col">
        <section className="w-full">
          {/* Input File / Text */}
          <div className="tabs tabs-box">

            {/* Tab Upload File */}
            <input
              type="radio"
              name="inputan"
              className="tab"
              aria-label="Upload File"
              defaultChecked
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
                <ButtonAtom loading={loading} text={"Proses File"} />
              </form>
            </div>

            {/* Tab Input Gen */}
            <input
              type="radio"
              name="inputan"
              className="tab"
              aria-label="Input Gen"

            />
            <div className="tab-content bg-base-100 border-base-300 p-6">
              {/* <form id="input-gen-form" onSubmit={handleSubmit}>
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
              </form> */}

              <h1 className='font-poppins text-xl font-semibold'>Tahap Pengembangan Selanjutnya Belum Di Integrasikan</h1>
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
                defaultChecked
              />
              <div className="tab-content bg-base-100 border-base-100 p-6 mt-2">
                {/* Menggunakan GraphVisualizerComponent */}
                <GraphVisualizer imgPath={displayImagePath} />
              </div>

              {/* TAB TABEL */}
              <input type="radio" name="hasil" className="tab" aria-label="Tabel" />
              {( // Tampilkan konten hanya jika tab aktif
                <div className="tab-content bg-base-100 border-base-100 p-6 mt-2">
                  <div className="overflow-x-auto h-[507px] w-full">

                    {/* Menampilkan Tabel jika data tersedia */}
                    <div>
                      <TableComponent tableData={null} />
                      <div className="join">
                        <button className="join-item btn">«</button>
                        <button className="join-item btn">Page 1</button>
                        <button className="join-item btn">»</button>
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </>
  );
}

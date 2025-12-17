import { useRef } from 'react';

// Components
import GraphVisualizer from './atom/GraphVisualizerComponent.jsx';
import ButtonAtom from './atom/ButtonAtom.jsx';

// Hooks Custom
import useInputDataset from '../hooks/useInputDataset.js';

export default function InputDataset() {
  const kosong = null; // Placeholder untuk kondisi kosong

  // Pake Hooks Custom
  const { data, loading, error, handleSubmit } = useInputDataset();

  // Ref untuk formFeature (formulir input feature kedua)
  const formFeatureRef = useRef(null);

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
            <div className="tab-content bg-base-100 border-base-300 p-4">
              <form id="upload-form" onSubmit={handleSubmit}>
                <p className="text-base font-montserrat font-medium mb-2 w-fit">Input Dataset (.xlsx) : </p>
                <div className="flex flex-col w-full">
                  <fieldset className="fieldset w-full">
                    <input
                      type="file"
                      name="file_dataset"
                      className="file-input"
                      accept=".xlsx"
                      disabled={loading} // Nonaktifkan saat loading
                      required // File wajib diunggah
                    />
                  </fieldset>
                  <ButtonAtom loading={loading} text={"Proses File"} />
                </div>
              </form>
            </div>

            {/* Tab Input Gen */}
            {kosong && (
              <>
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
              </>
            )}
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
            <>
              {/*  GRAF */}
              <div className="w-full bg-base-200 p-4 rounded-lg mb-5">
                <h2 className="w-fit font-poppins text-lg font-semibold mb-2 ">
                  Graf dari STRINGDB
                </h2>
                <GraphVisualizer imgPath={displayImagePath} />
              </div>
            </>
          )}
        </section>
      </main>
    </>
  );
}

// FormatData
import { enamAngkaBelakangKoma, titikTiga } from "../../utils/formartData";

// Components
import CardAtom from "../atom/CardAtom";
import GraphVisualizer from "../atom/GraphVisualizerComponent";
import TableComponent from "../atom/TableComponent";


export default function DK_HasilDataset(
  {
    loadingDataset,
    errorDataset,
    dataset,
    tabelDataset,
    onPageChange,
    currentPageState
  }
) {

  const { pagination, records } = tabelDataset || { pagination: {}, records: [] };
  const activePage = currentPageState || pagination.current_page || 1;

  // Pake Hooks Custom
  const { img_path, data } = dataset || { img_path : null, data: null };
  // Tentukan path gambar yang akan ditampilkan. Gunakan ImageGraph default jika data.img_path null
  const displayImagePath = img_path && img_path ? img_path : "  https://placehold.co/500x500?text=No+Image+Available";

  return (
    <>
      <section className="mb-8">
        {/* Menampilkan Loader jika loading true */}
        {loadingDataset &&
          <div className="skeleton h-[500px] w-full">
          </div>
        }

        {/* Menampilkan Error jika ada */}
        {errorDataset && (
          <div role="alert" className="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{errorDataset}</span>
          </div>
        )}

        {/* Tampilan Hasil Utama (Hanya jika tidak loading dan tidak ada error) */}
        {!loadingDataset && !errorDataset && dataset ?
          (
            <>
              <h2 className="text-xl font-semibold font-poppins mb-3">
                2. Hasil Dataset
              </h2>
              <div className="flex flex-col lg:flex-row w-full gap-5">
                {/* Kiri */}
                <div className="w-full flex flex-col gap-5">
                  <div className="flex gap-5">
                    <CardAtom title={"Jumlah Simpul (Nodes)"}
                      content={titikTiga(data.nodes)}
                      className={"flex-1 card bg-base-200 card-md shadow-sm"}
                    />
                    <CardAtom title={"Jumlah Tepi (Edges)"} content={titikTiga(data.edges)}
                      className={"flex-1 card bg-base-200 card-md shadow-sm"}
                    />
                  </div>
                  <div className="flex gap-5">
                    <CardAtom title={"Kepadatan (Density)"} content={enamAngkaBelakangKoma(data.density)}
                      className={"flex-1 card bg-base-200 card-md shadow-sm"}
                    />
                    <CardAtom title={"Koefisien Kluster"} content={enamAngkaBelakangKoma(data.clust_coef)}
                      className={"flex-1 card bg-base-200 card-md shadow-sm"}
                    />
                  </div>
                </div>

                {/* Kanan */}
                <div className="w-full bg-base-200 px-4 py-1 rounded-lg tabs tabs-border">
                  {/* Graf */}
                  <input type="radio" name="hasil_dataset" className="tab" aria-label="Graf dari STRINGDB" defaultChecked />
                  <div className="tab-content border-base-300 bg-base-100 p-4">
                    {/* Isi Gambar Graf */}
                    <GraphVisualizer imgPath={displayImagePath} />
                  </div>

                  {/* Tab } Table */}
                  <input type="radio" name="hasil_dataset" className="tab" aria-label="Isi Dataset (.tsv)" />
                  <div className="tab-content border-base-300 bg-base-100 p-4">
                    {/* Table */}
                    <TableComponent
                      tableData={records}
                      currentPage={activePage}
                      itemsPerPage={pagination.page_size}
                    />
                    <div className="join">
                      {pagination.has_prev &&
                        <button
                          className="join-item btn"
                          disabled={!pagination.has_prev}
                          onClick={() => onPageChange(pagination.current_page - 1)}
                        >«</button>
                      }
                      <p className="join-item btn cursor-auto">Halaman {pagination.current_page}</p>
                      {pagination.has_next &&
                        <button
                          className="join-item btn"
                          disabled={!pagination.has_next}
                          onClick={() => onPageChange(pagination.current_page + 1)}
                        >»</button>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
      </section >
    </>
  )
}
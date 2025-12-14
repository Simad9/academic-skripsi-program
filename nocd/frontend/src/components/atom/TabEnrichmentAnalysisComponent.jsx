import { useState, Fragment } from "react";

export default function TabEnrichmentAnalysisComponent({ datas, label, defaultChecked }) {
  // UBAH 1: State awal adalah array kosong [], bukan null.
  // Array ini akan menampung SEMUA index yang sedang terbuka.
  const [activeIndices, setActiveIndices] = useState([]);

  // UBAH 2: Logika toggle untuk menambah/menghapus index dari array
  const handleToggleDetail = (index) => {
    if (activeIndices.includes(index)) {
      // Jika index sudah ada (sedang terbuka), hapus dari array (filter)
      setActiveIndices(activeIndices.filter((i) => i !== index));
    } else {
      // Jika belum ada (sedang tertutup), tambahkan ke array
      setActiveIndices([...activeIndices, index]);
    }
  };

  return (
    <>
      <input
        type="radio"
        name="enrichment_analysis"
        className="tab"
        aria-label={label}
        defaultChecked={defaultChecked}
      />

      {
        datas.length > 0 ? (
          <div className="tab-content border-base-300 bg-base-100 p-4">
            {/* Graf */}
            <div className="w-full rounded-lg mb-5">
              <h2 className="w-fit font-poppins text-lg font-semibold mb-2">Graf Enrichment Analysis</h2>
              <img
                src="https://placehold.co/2000x500/?text=Graf Enrichment Analysis"
                alt="Graf Enrichment Analysis"
              />
            </div>

            {/* Tabel */}
            <div className="overflow-x-auto max-h-[400px] border border-nocd/50 rounded-lg">
              <table className="table border-collapse table-fixed w-full">
                <thead>
                  <tr className="font-bold bg-base-200">
                    <th className="w-[10%] whitespace-nowrap">Term ID</th>
                    <th className="w-[40%]">Nama Term</th>
                    <th className="w-[15%] whitespace-nowrap">P-Value</th>
                    <th className="w-[15%] whitespace-nowrap">Total Gene</th>
                    <th className="w-[20%] whitespace-nowrap text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {datas.map((data, index) => {
                    // UBAH 3: Cek apakah index ada di dalam array activeIndices
                    const isOpen = activeIndices.includes(index);

                    return (
                      <Fragment key={index}>
                        <tr>
                          <td className="truncate">{data.term_id}</td>
                          <td className="whitespace-normal">{data.term_name}</td>
                          <td>{data.p_value}</td>
                          <td>{data.gene_count}</td>
                          <td className="text-center">
                            <button
                              className="btn btn-sm btn-primary"
                              onClick={() => handleToggleDetail(index)}
                            >
                              {isOpen ? "Tutup Gen" : "Lihat Gen"}
                            </button>
                          </td>
                        </tr>

                        {isOpen && (
                          <tr className="w-full">
                            <td colSpan="5" className="p-0 border-none">
                              <div className="mx-3 my-2 bg-primary-content text-primary border-base-300 border rounded-lg overflow-hidden">
                                <div className="p-3 flex justify-between bg-nocd/50 items-center">
                                  <h1 className="font-semibold text-base">
                                    Gen berada di <span className="font-bold">"{data.term_name}"</span>
                                  </h1>
                                  <div className="badge badge-xs badge-accent mt-1">
                                    {data.gene_count} Gen
                                  </div>
                                </div>
                                <div className="p-3">
                                  <div className="flex flex-wrap gap-2">
                                    {data.gene_list.map((gene, idx) => (
                                      <div key={idx} className="badge badge-md badge-accent">
                                        {gene}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          // Data TIdak Ada
          <div className="tab-content border-base-300 bg-base-100 p-4">
            <p className="text-center">Tidak ada data enrichment analysis yang ditemukan.</p>
          </div>
        )
      }

    </>
  );
}
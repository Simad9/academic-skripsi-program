import { useState } from "react";
import TabEnrichmentAnalysisComponent from "./molekul/TabEnrichmentAnalysisComponent";

// Data dummy untuk simulasi 100+ item
const dummyKomunitas = [
  'Komunitas 1 (A)', 'Komunitas 2 (B)', 'Komunitas 3 (C)', 'Komunitas 4 (D)', 'Komunitas 5 (E)',
  'Komunitas Alpha', 'Komunitas Beta', 'Komunitas Gamma', 'Komunitas Delta', 'Komunitas Epsilon',
  // ... Tambahkan 90 item lain untuk mencapai 100+
  ...Array.from({ length: 90 }, (_, i) => `Komunitas Z${i + 6}`),
];

const dataEnrichmentAnalysis =
{
  data_bp: [
    {
      
      term_id: "GO:00009748",
      term_name: "response to glucose",
      log10p: "15.00",
      p_value: "1.01e-29",
      gene_count: "15",
      gene_list: ["TP53", "ABC", "BUTR"],
    },
    {
      term_id: "GO:0000978",
      term_name: "response to glue",
      log10p: "15.00",
      p_value: "1.01e-29",
      gene_count: "15",
      gene_list: ["TP53", "ABC", "BUTR"],
    },
    {
      term_id: "GO:00009748",
      term_name: "rescose",
      log10p: "15.00",
      p_value: "1.01e-29",
      gene_count: "15",
      gene_list: ["TP53", "ABC", "BUTR"],
    },
  ],
  data_mf: [

  ],
  data_cc: [

  ],
  data_kp: [
    {
      term_id: "KEGG:04950",
      term_name: "Maturity onset diabetes of the young",
      log10p: "15.00",
      p_value: "1.01e-29",
      gene_count: "14",
      gene_list: ["TP53", "ABC", "BUTR"],
    },
  ],
}

export default function EnrichmentAnalysis() {
  const [tombolDitekan, setTombolDitekan] = useState(false)
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKomunitas, setSelectedKomunitas] = useState(null);

  // Filter data berdasarkan input pencarian
  const filteredKomunitas = dummyKomunitas.filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (komunitas) => {
    setSelectedKomunitas(komunitas);
    setTombolDitekan(!tombolDitekan)
    // Logika lain setelah memilih, misalnya menutup dropdown jika perlu
  };

  const handleTombolDitekan = () => {
    setTombolDitekan(!tombolDitekan)
    setTombolDitekan(!tombolDitekan)
  }

  console.log(selectedKomunitas);


  return (
    <div className="w-full mb-8">
      {/* Judul */}
      <h1 className="text-2xl font-bold font-poppins mb-5">
        Enrichment Analysis
      </h1>
      {/* Enrichment Analysis Hasil */}
      <section className="w-full mb-8" >
        {/* Dropdown | Pilih Komunitas */}
        <div className="w-full max-w-xs flex-1 mb-5">
          <p className="text-base font-montserrat font-medium mb-2 w-fit">
            Pilih Komunitas :
          </p>

          {/* Dropdown dengan posisi start */}
          <div className="dropdown dropdown-start w-full" onClick={handleTombolDitekan}>
            <div
              tabIndex={0}
              role="button"
              className="btn m-1 w-full justify-between" // Tambahkan lebar
            >
              {selectedKomunitas || "Pilih Komunitas"}
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${tombolDitekan ? "rotate-180" : "rotate-0"}`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>

            {/* Konten Dropdown */}
            <div tabIndex={0} className="dropdown-content bg-base-100 rounded-box z-10 w-full shadow-xl p-2">

              {/* Input Pencarian */}
              <input
                type="text"
                placeholder="Cari Komunitas..."
                className="input input-sm input-bordered w-full mb-2 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              {/* Daftar Komunitas dengan Scrolling */}
              <ul
                tabIndex={-1}
                className="menu bg-base-100 rounded-box w-full p-0 overflow-y-auto max-h-60" // max-h-60 membatasi tinggi dan memungkinkan scroll
              >
                {filteredKomunitas.length > 0 ? (
                  filteredKomunitas.map((item, index) => (
                    <li key={index} onClick={() => handleSelect(item)}>
                      <button
                        className={`text-left ${selectedKomunitas === item ? 'active' : ''}`}
                      >
                        {item}
                      </button>
                    </li>
                  ))
                ) : (
                  // Tampilkan pesan jika tidak ada hasil
                  <li className="p-2 text-center text-gray-500">
                    Tidak ada hasil ditemukan
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
        {/* Hasil Graf Enrichment Analysis*/}
        <div>
          <div className="tabs tabs-border">
            <TabEnrichmentAnalysisComponent
              datas={dataEnrichmentAnalysis.data_bp}
              label="Biological Process"
              defaultChecked={true}
            />
            <TabEnrichmentAnalysisComponent
              datas={dataEnrichmentAnalysis.data_mf}
              label="Molecular Function"
            />
            <TabEnrichmentAnalysisComponent
              datas={dataEnrichmentAnalysis.data_cc}
              label="Cellular Component"
            />
            <TabEnrichmentAnalysisComponent
              datas={dataEnrichmentAnalysis.data_kp}
              label="KEGG Pathway"
            />
          </div>
        </div>
        {/* Tabel Enrichment Analysis */}
        <div></div>
      </section>
    </div>
  )
}
import { useState, useEffect, useRef } from "react";
import TabEnrichmentAnalysisComponent from "./atom/TabEnrichmentAnalysisComponent";
import { useEnrichmentAnalysisKomunitas } from "../hooks/useEnrichmentAnalysis";


export default function EnrichmentAnalysis({ dataListKomunitas }) {
  const safeDataListKomunitas = dataListKomunitas || [];

  // Enrichment
  const { dataEA, loadingEA, errorEA, handleEAKomunitas } = useEnrichmentAnalysisKomunitas();

  // State
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedKomunitas, setSelectedKomunitas] = useState(null);

  // Ref untuk mendeteksi klik di luar dropdown
  const dropdownRef = useRef(null);

  // Filter Logic
  const filteredKomunitas = safeDataListKomunitas.filter((item) => {
    const label = `Komunitas ${item.komunitas}`;
    return label.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Handle Pilih Item
  const handleSelect = (item) => {
    // FIX 1: Ambil properti komunitas dari object item
    setSelectedKomunitas(item.komunitas);

    // Ambil Enrichment Analysis
    handleEAKomunitas(item.genes)

    setIsOpen(false); // Tutup dropdown
    setSearchTerm(""); // Reset pencarian
    console.log("Komunitas Terpilih:", item);
  };

  // Toggle Dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // FIX 2: Event Listener untuk menutup dropdown jika klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Pasang listener saat component mount
    document.addEventListener("mousedown", handleClickOutside);

    // Bersihkan listener saat component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  

  return (
    <div className="w-full mb-8">
      <h1 className="text-2xl font-bold font-poppins mb-5">
        Enrichment Analysis
      </h1>

      <section className="w-full mb-8">
        {/* Dropdown | Pilih Komunitas */}
        <div className="w-full max-w-xs flex-1 mb-5">
          <p className="text-base font-montserrat font-medium mb-2 w-fit">
            Pilih Komunitas :
          </p>

          {/* FIX 3: Tambahkan ref={dropdownRef} di sini */}
          {/* Gunakan class 'dropdown-open' agar React yang mengontrol buka/tutup, bukan CSS hover/focus */}
          <div
            ref={dropdownRef}
            className={`dropdown dropdown-start w-full ${isOpen ? "dropdown-open" : ""}`}
          >
            {/* Tombol Trigger */}
            <div
              tabIndex={0}
              role="button"
              className="btn m-1 w-full justify-between bg-base-100 border-base-300"
              onClick={toggleDropdown}
            >
              {selectedKomunitas
                ? `Komunitas ${selectedKomunitas}`
                : "Pilih Komunitas"}

              {/* Rotasi Panah sekarang akan sinkron karena isOpen dikontrol React */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            {/* Konten Dropdown */}
            {/* Render conditional {isOpen && ...} agar DOM lebih ringan */}
            <div
              tabIndex={0}
              className="dropdown-content bg-base-100 rounded-box z-10 w-full shadow-xl p-2 border border-base-200"
            >
              {/* Input Pencarian */}
              <input
                type="text"
                placeholder="Cari (misal: 1, 5, 12)..."
                className="input input-sm input-bordered w-full mb-2 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                // Mencegah klik di input menutup dropdown (walaupun sudah dihandle ref, ini safety tambahan)
                onClick={(e) => e.stopPropagation()}
                autoFocus
              />

              {/* Daftar Komunitas */}
              <ul className="menu bg-base-100 rounded-box w-full p-0 overflow-y-auto max-h-60">
                {filteredKomunitas.length > 0 ? (
                  filteredKomunitas.map((item, index) => (
                    // FIX 4: Kirim object item UTUH ke handleSelect
                    <li key={index} onClick={() => handleSelect(item)}>
                      <button
                        className={`text-left ${selectedKomunitas === item.komunitas
                          ? "active font-bold"
                          : ""
                          }`}
                      >
                        Komunitas {item.komunitas}
                      </button>
                    </li>
                  ))
                ) : (
                  <li className="p-2 text-center text-gray-500 text-sm">
                    Tidak ada hasil ditemukan
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Hasil Graf Enrichment Analysis */}
        {/* Menampilkan Loader jika loading true */}
        {loadingEA &&
          <div className="skeleton h-[500px] w-full">
          </div>
        }

        {/* Menampilkan Error jika ada */}
        {errorEA && (
          <div role="alert" className="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{errorEA}</span>
          </div>
        )}

        {!selectedKomunitas && (
          <div className="w-full h-40 bg-base-200 rounded-lg flex items-center justify-center text-gray-500">
            Silahkan pilih komunitas terlebih dahulu untuk melihat hasil analisis.
          </div>
        )}


        {!loadingEA && !errorEA && selectedKomunitas && dataEA && (
          <div>
            <div className="tabs tabs-border">
              <TabEnrichmentAnalysisComponent
                datas={dataEA.data_bp}
                label="Biological Process"
                selectedKomunitas={selectedKomunitas}
                defaultChecked={true}
              />
              <TabEnrichmentAnalysisComponent
                datas={dataEA.data_mf}
                label="Molecular Function"
                selectedKomunitas={selectedKomunitas}
              />
              <TabEnrichmentAnalysisComponent
                datas={dataEA.data_cc}
                label="Cellular Component"
                selectedKomunitas={selectedKomunitas}
              />
              <TabEnrichmentAnalysisComponent
                datas={dataEA.data_kp}
                label="KEGG Pathway"
                selectedKomunitas={selectedKomunitas}
              />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
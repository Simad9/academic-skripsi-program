import { useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import InputDataset from '../components/InputDataset.jsx'
import DeteksiKomunitas from '../components/DeteksiKomunitas.jsx';
import EnrichmentAnalysis from '../components/EnrichmentAnalysis.jsx';
import { formatDataListKomunitas } from '../utils/formartData.js';

function App() {
  // Data List Komunitas untuk Enrichment Analysisnya
  const [komunitasListData, setKomunitasListData] = useState(null);
  const handleDataFromDK = async (rawData) => {
    if (!rawData) return
    
    const formatData = await formatDataListKomunitas(rawData)
    setKomunitasListData(formatData)
  }

  // Setting Tombol Keliatan
  const [deteksiKomunitas, setDeteksiKomunitas] = useState(true);
  const [enrichmentAnalysis, setEnrichmentAnalysis] = useState(true);
  const lanjutDeteksiKomunitas = (data) => {
    setDeteksiKomunitas(data);
  }
  const lanjutEnrichmentAnalysis = (data) => {
    setEnrichmentAnalysis(data);
  }

  return (
    // Jadi BOdy
    <div className='bg-base-300 pb-50'>
      {/* Jadi Isinya - Jika ada "h-screen" hapus aja*/}
      <main className='px-20 w-full flex flex-col gap-10 '>
        {/* NAVBAR */}
        <section className="sticky top-0 z-10">
          <Navbar />
        </section>

        {/* Input-Dataset */}
        <section id="input-dataset" className="w-full bg-base-100 rounded-lg p-6 shadow-sm">
          <InputDataset />
          <button className="btn btn-soft btn-base-100 w-full rounded-lg mt-3" onClick={() => lanjutDeteksiKomunitas(true)}>Lanjut Deteksi Komunitas</button>
        </section>

        {/* Deteksi-Komunitas */}
        {deteksiKomunitas && (
          <section id="deteksi-komunitas" className="w-full bg-base-100 rounded-lg p-6 shadow-sm">
            <DeteksiKomunitas
              handleDataFromDK={handleDataFromDK}
            />
            <button className="btn btn-soft btn-base-100 w-full rounded-lg mt-3" onClick={() => lanjutEnrichmentAnalysis(true)}>Lanjut Enrichment Analysis</button>
          </section>
        )}


        {/* Enrichment-Analysis */}
        {enrichmentAnalysis && (
          <section id="enrichment-analysis" className="w-full bg-base-100 rounded-lg p-6 shadow-sm">
            <EnrichmentAnalysis
              dataListKomunitas={komunitasListData}
            />
          </section>
        )}

      </main>
    </div>
  )
}

export default App

import React, { useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import InputDataset from '../components/InputDataset.jsx'

function App() {
  const [deteksiKomunitas, setDeteksiKomunitas] = useState(null);
  const [enrichmentAnalysis, setEnrichmentAnalysis] = useState(null);

  // Hooks
  const lanjutDeteksiKomunitas = (data) => {
    setDeteksiKomunitas(data);
  }

  const lanjutEnrichmentAnalysis = (data) => {
    setEnrichmentAnalysis(data);
  }

  return (
    // Jadi BOdy
    <div className='bg-base-300'>
      {/* Jadi Isinya */}
      <main className='px-20 w-full flex flex-col gap-10'>
        {/* NAVBAR */}
        <section class="sticky top-0 z-10">
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
            <h1 className="text-2xl font-bold font-poppins mb-5">
              Deteksi Komunitas
            </h1>
            <button className="btn btn-soft btn-base-100 w-full rounded-lg mt-3" onClick={() => lanjutEnrichmentAnalysis(true)}>Lanjut Enrichment Analysis</button>
          </section>
        )}


        {/* Enrichment-Analysis */}
        {enrichmentAnalysis && (
          <section id="enrichment-analysis" className="w-full bg-base-100 rounded-lg p-6 shadow-sm">
            <h1 className="text-2xl font-bold font-poppins mb-5">
              Enrichment Analysis
            </h1>
          </section>
        )}

      </main>
    </div>
  )
}

export default App

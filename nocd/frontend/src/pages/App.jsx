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
    <div className='container mx-auto flex flex-col gap-10 pb-30 scroll-smooth'>
      {/* NAVBAR */}
      <section class="sticky top-0 z-10">
        <Navbar />
      </section>

      {/* Input-Dataset */}
      <section id="input-dataset">
        <InputDataset />
        <button className="btn btn-soft btn-base-100 w-full rounded-lg" onClick={() => lanjutDeteksiKomunitas(true)}>Lanjut Deteksi Komunitas</button>
      </section>

      {/* Deteksi-Komunitas */}
      {deteksiKomunitas && (
        <section id="deteksi-komunitas">
          <h1 className="text-3xl font-bold font-poppins mb-5">
            Deteksi Komunitas
          </h1>
          <button className="btn btn-soft btn-base-100 w-full rounded-lg" onClick={() => lanjutEnrichmentAnalysis(true)}>Lanjut Enrichment Analysis</button>
        </section>
      )}


      {/* Enrichment-Analysis */}
      {enrichmentAnalysis && (
        <section id="enrichment-analysis">
          <h1 className="text-3xl font-bold font-poppins mb-5">
            Enrichment Analysis
          </h1>
        </section>
      )}

    </div>
  )
}

export default App

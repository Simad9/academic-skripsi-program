import Navbar from '../components/Navbar.jsx'
import InputDataset from '../components/InputDataset.jsx'

function App() {
  return (
    <div className='container mx-auto flex flex-col gap-10'>
      {/* NAVBAR */}
      <Navbar />

      {/* Input-Dataset */}
      <section id="input-dataset">
        <InputDataset />
      </section>

      {/* Deteksi-Komunitas */}
      <section id="deteksi-komunitas">
        <h1 className="text-3xl font-bold font-poppins mb-5">
          Deteksi Komunitas
        </h1>
      </section>

      {/* Enrichment-Analysis */}
      <section id="enrichment-analysis">
        <h1 className="text-3xl font-bold font-poppins mb-5">
          Enrichment Analysis
        </h1>
      </section>



    </div>
  )
}

export default App

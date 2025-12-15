import { useEffect } from "react";

// Components
import DK_HasilDataset from "./molekul/DK_HasilDataset.jsx";

// Hooks
import { usePilihDataset, usePilihModel, useSliderRequireScore } from "../hooks/useDeteksiKomunitas.js";
import DK_MasukanModel from "./molekul/DK_MasukanModel.jsx";
import DK_PilihDataset from "./molekul/DK_PilihDataset.jsx";
import DK_DeteksiKomunitas from "./molekul/DK_DeteksiKomunitas.jsx";

export default function DeteksiKomunitas({ handleDataFromDK }) {
  // 1. Ambil Data Slider Require Score
  const { sliderRequireScore, handleSliderValue } = useSliderRequireScore();

  // 2.1. Data Detail Dataset
  const {
    dataset, loadingDataset, errorDataset, handleClickDataset,
    tabelDataset, handlePageChange, newPage
  } = usePilihDataset();

  // 2.3. Input Model
  const {
    configModel, loadingConfigModel, errorConfigModel, handleConfigModel,
    threshold, handleThreshold,
    deteksiKomunitas, loadingDeteksiKomunitas, errorDeteksiKomunitas, handleDeteksiKomunitas
  } = usePilihModel()

  // Bonus Kirim ke Parrent Datanya
  // --- LOGIC PENTING: LEMPAR DATA KE ATAS ---
  useEffect(() => {
    // Jika deteksiKomunitas sudah ada isinya (tidak null)
    if (deteksiKomunitas) {
      // Kirim data mentah ini ke Parent (App.jsx)
      const allData = deteksiKomunitas.data
      handleDataFromDK(allData);
    }
  }, [deteksiKomunitas]); // Jalankan setiap kali deteksiKomunitas berubah

  return (
    <div className="w-full mb-8">
      {/* Judul */}
      <h1 className="text-2xl font-bold font-poppins mb-5">
        Deteksi Komunitas
      </h1>

      {/* 1. Form Pilih Dataset */}
      <DK_PilihDataset
        sliderRequireScore={sliderRequireScore}
        handleSliderValue={handleSliderValue}
        loadingDataset={loadingDataset}
        handleClickDataset={() => handleClickDataset(sliderRequireScore)}
      />

      {/* 2. Hasil Ambil Dataset */}
      <DK_HasilDataset
        loadingDataset={loadingDataset}
        errorDataset={errorDataset}
        dataset={dataset}
        tabelDataset={tabelDataset}
        onPageChange={(page) => handlePageChange(sliderRequireScore, page)}
        currentPageState={newPage}
      />

      {/* 3. Masukan Model */}
      <DK_MasukanModel
        // Note : Kirim dataset, jika ada maka render isinya
        configModel={configModel}
        loadingConfigModel={loadingConfigModel}
        errorConfigModel={errorConfigModel}
        handleConfigModel={handleConfigModel}
        sliderThres={threshold}
        handleThreshold={handleThreshold}
        loadingDeteksiKomunitas={loadingDeteksiKomunitas}
        handleDeteksiKomunitas={() => handleDeteksiKomunitas(sliderRequireScore)}
      />

      {
        errorDeteksiKomunitas && (
          <div role="alert" className="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{errorDeteksiKomunitas}</span>
          </div>
        )
      }

      {/* 4. Hasil Deteksi Komunitas */}
      <DK_DeteksiKomunitas
        deteksiKomunitas={deteksiKomunitas}
        loadingDeteksiKomunitas={loadingDeteksiKomunitas}
        errorDeteksiKomunitas={errorDeteksiKomunitas}
      />

    </div >
  )
}
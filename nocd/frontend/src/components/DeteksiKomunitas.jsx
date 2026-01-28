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
  let { sliderRequireScore, handleSliderValue } = useSliderRequireScore();
  sliderRequireScore = 0.4;

  // 2.1. Data Detail Dataset
  const {
    dataset, loadingDataset, errorDataset, handleClickDataset,
    tabelDataset, handlePageChange, newPage,
    fileDataset, handleAmbilDataFileDataset
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
        handleClickDataset={() => {
          // if (!fileDataset) {
          //   alert("File belum dipilih!");
          //   return;
          // }
          handleClickDataset(fileDataset, sliderRequireScore);
        }}
        handleAmbilDataFileDataset={handleAmbilDataFileDataset}
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
        dataset={dataset}
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

      {/* 4. Hasil Deteksi Komunitas */}
      <DK_DeteksiKomunitas
        deteksiKomunitas={deteksiKomunitas}
        loadingDeteksiKomunitas={loadingDeteksiKomunitas}
        errorDeteksiKomunitas={errorDeteksiKomunitas}
      />

    </div >
  )
}
import { useState } from "react";
import {
  fetchDeteksiKomunitasData,
  fetchInputModelData,
  fetchPilihDatasetData,
  fetchTabelDatasetData,
} from "../api/deteksiKomunitas_api";

export const useSliderRequireScore = () => {
  const [sliderRequireScore, setSliderRequireScore] = useState(0.5);
  const handleSliderValue = (e) => {
    setSliderRequireScore(parseFloat(e.target.value));
  };

  return {
    sliderRequireScore,
    handleSliderValue,
  };
};

export const usePilihDataset = () => {
  const [dataset, setDataset] = useState(null);
  const [loadingDataset, setLoadingDataset] = useState(false);
  const [errorDataset, setErrorDataset] = useState(null);

  const [tabelDataset, setTabelDataset] = useState(null);

  const [newPage, setNewPage] = useState(1);

  const handleClickDataset = async (require_score) => {
    setLoadingDataset(true);
    setErrorDataset(null);

    setNewPage(1);

    const reqData = {
      require_score: String(require_score * 1000),
      page: 1,
    };

    try {
      const [fetchPilihDataset, fetchTabelDataset] = await Promise.all([
        fetchPilihDatasetData(reqData),
        fetchTabelDatasetData(reqData),
      ]);
      setDataset(fetchPilihDataset);
      setTabelDataset(fetchTabelDataset);
      console.log("Data berhasil di ambil", fetchPilihDataset);
      console.log("Data berhasil di ambil", fetchTabelDataset);
    } catch (err) {
      setErrorDataset("Gagal berkomunikasi dengan server: " + err.message);
    } finally {
      setLoadingDataset(false);
    }
  };

  const handlePageChange = async (require_score, newPage) => {
    try {
      const reqData = {
        require_score: String(require_score * 1000),
        page: newPage,
      };

      console.log("Fetching Page:", newPage, "with Score:", reqData.require_score);

      const fetchTabelDataset = await fetchTabelDatasetData(reqData);
      setTabelDataset(fetchTabelDataset);
      console.log("Data berhasil di ambil", fetchTabelDataset);
      setNewPage(newPage); // Update state page setelah berhasil
    } catch (err) {
      setErrorDataset("Gagal berkomunikasi dengan server: " + err.message);
    }
  };

  return {
    dataset,
    loadingDataset,
    errorDataset,
    handleClickDataset,
    tabelDataset,
    handlePageChange,
    newPage,
  };
};

export const usePilihModel = () => {
  const [fileModel, setFileModel] = useState(null);
  // Config
  const [configModel, setConfigModel] = useState(null);
  const [loadingModel, setLoadingModel] = useState(false);
  const [errorModel, setErrorModel] = useState(null);

  const handleConfigModel = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileModel(file);

    setLoadingModel(true);
    setErrorModel(null);

    const formData = new FormData();
    formData.append("file_model", file);

    try {
      const fetchHyperParameterModel = await fetchInputModelData(formData);
      setConfigModel(fetchHyperParameterModel);
      console.log("Data berhasil di ambil:", fetchHyperParameterModel);
    } catch (err) {
      setErrorModel("Gagal berkomunikasi dengan server: " + err.message);
    } finally {
      setLoadingModel(false);
    }
  };

  // Threshold
  const [threshold, setThreshold] = useState(0.5);

  const handleThreshold = (e) => {
    setThreshold(parseFloat(e.target.value));
  };

  // Deteksi Komuntias
  const [deteksiKomunitas, setDeteksiKomunitas] = useState(null);
  const [loadingDeteksiKomunitas, setLoadingDeteksiKomunitas] = useState(false);
  const [errorDeteksiKomunitas, setErrorDeteksiKomunitas] = useState(false);

  const handleDeteksiKomunitas = async (require_score) => {
    if (!fileModel) {
      setErrorDeteksiKomunitas("Harap input file model terlebih dahulu.");
      return;
    }

    // Jika undefined/null, kita paksa error atau kasih default (misal 0.5)
    if (require_score === undefined || require_score === null) {
      setErrorDeteksiKomunitas("Require Score tidak terbaca.");
      return;
    }

    setLoadingDeteksiKomunitas(true);
    setErrorDeteksiKomunitas(null);

    const formData = new FormData();
    formData.append("file_model", fileModel);
    formData.append("threshold", parseFloat(threshold));
    formData.append("require_score", String(require_score * 1000));

    try {
      const fetchHasilDeteksi = await fetchDeteksiKomunitasData(formData);
      setDeteksiKomunitas(fetchHasilDeteksi);
      console.log("Data berhasil di ambil:", fetchHasilDeteksi);
    } catch (err) {
      setErrorModel("Gagal berkomunikasi dengan server: " + err.message);
    } finally {
      setLoadingDeteksiKomunitas(false);
    }
  };

  return {
    // Config Model
    configModel,
    loadingModel,
    errorModel,
    handleConfigModel,
    // Threshold
    threshold,
    handleThreshold,
    // Deteksi Komunitas
    deteksiKomunitas,
    loadingDeteksiKomunitas,
    errorDeteksiKomunitas,
    handleDeteksiKomunitas,
  };
};

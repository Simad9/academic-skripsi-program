import { useState } from "react";
import { fetchEnrichmentAnalysisData } from "../api/enrichmentAnalysis_api";

export const useEnrichmentAnalysisKomunitas = () => {
  const [dataEA, setdataEA] = useState(null);
  const [loadingEA, setLoadingEA] = useState(false);
  const [errorEA, setErrorEA] = useState(null);

  const handleEAKomunitas = async (genes) => {
    setLoadingEA(true);
    setErrorEA(null);

    const reqData = {
      gene_list: genes,
    };

    try {
      const fetchDataEA = await fetchEnrichmentAnalysisData(reqData);
      setdataEA(fetchDataEA);
      console.log("Data berhasil diambil : ", fetchDataEA);
    } catch (err) {
      setErrorEA("Gagal berkomunikasi dengan server: " + err.message);
    } finally {
      setLoadingEA(false);
    }
  };

  return {
    dataEA,
    loadingEA,
    errorEA,
    handleEAKomunitas,
  };
};

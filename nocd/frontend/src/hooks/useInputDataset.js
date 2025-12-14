import { useState } from "react";
import { fetchStringDBImageData } from "../api/inputDataset_api";

const useInputDataset = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset state sebelum memproses
    setLoading(true);
    setError(null);
    // Pertahankan data visual lama saat loading, atau reset: setData(null);

    const form = e.target;
    const formData = new FormData(form);

    try {
      const fetchImageData = await fetchStringDBImageData(formData);
      setData(fetchImageData);
      console.log("Data gambar STRINGDB berhasil dimuat:", fetchImageData);
    } catch (err) {
      setError("Gagal berkomunikasi dengan server: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, handleSubmit };
};

export default useInputDataset;

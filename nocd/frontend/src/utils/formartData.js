// tiap 3 angka titik
export const titikTiga = (data) => {
  if (data < 1000) {
    return data;
  } else {
    return (data / 1000).toFixed(3).replace(".", ".");
  }
};

// Float Enam Angka Belakang Koma
export const enamAngkaBelakangKoma = (data) => {
  return parseFloat(data).toFixed(4);
};

// Ubah data untuk komunitas
export const formatDataListKomunitas = (rawData) => {
  if (!rawData) return null;

  // CONTOH: Mengambil list gen dari setiap komunitas
  // Misal rawData adalah array of objects komunitas
  const formatted = rawData.map((item) => ({
    komunitas: item.komunitas,
    genes: item.gen_terdaftar, // Misal ini yang butuh diambil
  }));

  return formatted;
};

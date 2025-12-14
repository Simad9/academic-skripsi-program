// tiap 3 angka titik
export const titikTiga = (data) => {
  return (data / 1000).toFixed(3).replace(".", ".");
};

// Float Enam Angka Belakang Koma
export const enamAngkaBelakangKoma = (data) => {
  return parseFloat(data).toFixed(6);
};

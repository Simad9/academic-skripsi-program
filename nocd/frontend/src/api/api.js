import axios from "axios";

// Tentukan base URL API Anda
const API_BASE_URL = "http://127.0.0.1:8000/api"; // Ganti dengan URL Django Anda

// Buat instance axios untuk konfigurasi base URL, agar kode lebih bersih
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  // headers: {
  //   "Content-Type": "application/json", // Untuk param biasa
  //   "Content-Type": "multipart/form-data", // untuk file
  // },
});

export { apiClient };

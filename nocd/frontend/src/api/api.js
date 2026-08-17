import axios from "axios";

// Base URL dari env (set di Vercel: VITE_API_URL), fallback ke server dev Django
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

// Buat instance axios untuk konfigurasi base URL, agar kode lebih bersih
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  // headers: {
  //   "Content-Type": "application/json", // Untuk param biasa
  //   "Content-Type": "multipart/form-data", // untuk file
  // },
});

export { apiClient };

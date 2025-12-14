import { apiClient } from "./api";

export async function fetchStringDBImageData(formData) {
  const url = "/stringdb-image"; // Endpoint untuk mendapatkan data gambar STRINGDB

  try {
    // Axios otomatis menangani parsing JSON
    const response = await apiClient.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }); // Hanya perlu path endpoint

    const result = response.data; // Data respons dari server ada di properti .data

    // Cek apakah status dari backend Django adalah 'success'
    if (result.status === "success") {
      return result.data; // Mengembalikan array data
    } else {
      // Melempar error jika backend mengembalikan status non-success
      // Axios akan melempar error untuk status 4xx/5xx, tapi ini menangani status 'success' custom dari body respons.
      throw new Error(result.message || "Failed to fetch data from server.");
    }
  } catch (error) {
    // Axios membedakan error response (misal 404, 500) dan error lainnya (misal network error)
    let errorMessage;

    if (error.response) {
      // Error dari server (status code 4xx/5xx)
      errorMessage = `Server Error: ${error.response.status} - ${
        error.response.data.message || "Unknown Server Error"
      }`;
    } else if (error.request) {
      // Request dibuat tapi tidak ada respons (misal network error)
      errorMessage = "Network Error: No response received from server.";
    } else {
      // Error saat setup request
      errorMessage = error.message;
    }

    console.error("Error fetching STRINGDB data with Axios:", errorMessage);
    throw new Error(errorMessage);
  }
}

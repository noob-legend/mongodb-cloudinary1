/**
 * Photo API Service
 * - Semua panggilan HTTP ke backend menggunakan Axios
 * - Base URL: http://localhost:5000/api/photos
 * - Endpoints: GET, POST, PUT, DELETE untuk CRUD photos
 */
import axios from "axios";

// Base URL backend API
const API_BASE_URL = "http://localhost:5000/api/photos";

// Axios instance dengan konfigurasi default
const api = axios.create({
  baseURL: API_BASE_URL,
});

/**
 * Mengambil semua foto dari backend
 * @returns {Promise<Array>} Array of photo objects
 */
export async function getAllPhotos() {
  const response = await api.get("/");
  return response.data;
}

/**
 * Upload foto baru ke backend
 * @param {FormData} formData - FormData berisi title dan file (key: photo)
 * @returns {Promise<Object>} Created photo object
 */
export async function createPhoto(formData) {
  const response = await api.post("/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}

/**
 * Update foto yang sudah ada
 * @param {string} id - Photo ID
 * @param {FormData} formData - FormData berisi title dan/atau file (key: photo)
 * @returns {Promise<Object>} Updated photo object
 */
export async function updatePhoto(id, formData) {
  const response = await api.put(`/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}

/**
 * Hapus foto berdasarkan ID
 * @param {string} id - Photo ID
 * @returns {Promise<Object>} Deletion confirmation
 */
export async function deletePhoto(id) {
  const response = await api.delete(`/${id}`);
  return response.data;
}

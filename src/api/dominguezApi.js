import axios from "axios";
import { getEnvVariables } from "@/helpers";

const { VITE_API_URL } = getEnvVariables();

const dominguezApi = axios.create({
  baseURL: VITE_API_URL,
  headers: {
    "Content-Type": "application/json", // Establecer el tipo de contenido como JSON
  },
});

dominguezApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("Bearer")?.replace(/"/g, "");

  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  return config;
});

export default dominguezApi;

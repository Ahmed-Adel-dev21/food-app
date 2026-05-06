import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "https://upskilling-egypt.com:3006/api/v1",
  timeout: 5000,
  headers: {
    // "Content-Type": "application/json",
    // Accept: "application/json",
  },
});



api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
   
    return response.data;
  },
  (error) => {
    
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
    }

    return Promise.reject(error);
  },
);


export default api;
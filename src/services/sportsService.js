// src/services/sportsService.js
import axios from "axios";

// Configuración global de axios
const api = axios.create({ 
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api/sport" 
});

// Interceptor para incluir token en cada request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor de respuesta para manejar errores globales
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Si el token expira o hay error 401 → redirigir al login
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("role");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

// Endpoints del módulo deportes
export async function getSports() {
    const res = await api.get("/sports");
    return res.data.data;
}

export async function getSportById(id) {
    const res = await api.get(`/sports/${id}`);
    return res.data.data;
}

export async function createSport(sport) {
    const res = await api.post("/sports", sport);
    return res.data.data;
}

export async function updateSport(id, sport) {
    const res = await api.put(`/sports/${id}`, sport);
    return res.data.data;
}

export async function deleteSport(id) {
    const res = await api.delete(`/sports/${id}`);
    return res.data;
}

export async function changeStatus(id, status) {
    const res = await api.patch(`/sports/${id}/status`, { status });
    return res.data.data;
}

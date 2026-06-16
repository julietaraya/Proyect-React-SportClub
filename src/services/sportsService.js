import axios from "axios";

// Configuración global de axios
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api/sport",
});

// Interceptor para incluir token en cada request
// (todas las rutas de /sport exigen authenticate en el backend)
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor de respuesta: si el token expira (401), limpiar sesión
api.interceptors.response.use(
    (response) => response,
    (error) => {
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
    const res = await api.get("/");
    return res.data.data;
}

export async function getSportById(id) {
    const res = await api.get(`/${id}`);
    return res.data.data;
}

export async function createSport(sport) {
    const res = await api.post("/", sport);
    return res.data.data;
}

export async function updateSport(id, sport) {
    const res = await api.put(`/${id}`, sport);
    return res.data.data;
}

export async function deleteSport(id) {
    const res = await api.delete(`/${id}`);
    return res.data;
}

export async function changeStatus(id, status) {
    const res = await api.patch(`/${id}/status`, { status });
    return res.data.data;
}

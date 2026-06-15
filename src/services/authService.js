const API_URL = "http://localhost:3000/api/auth"; // apunta al backend real

// Función auxiliar para leer la respuesta
async function readResponse(response) {
    const raw = await response.text();
    if (!raw) return null;

    try {
        return JSON.parse(raw);
    } catch {
        return { message: raw };
    }
}

// Login contra el backend
export async function loginUser(credentials) {
    const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
    });

    const data = await readResponse(response);

    if (!response.ok) {
        throw new Error(data?.message || response.statusText || "Error al iniciar sesión");
    }

    return data || {};
}

// Registro contra el backend
export async function registerUser(userData) {
    const payload = {
        full_name: userData.full_name ?? userData.fullName ?? "",
        email: userData.email ?? "",
        password: userData.password ?? "",
    };

    const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    const data = await readResponse(response);

    if (!response.ok) {
        throw new Error(data?.message || response.statusText || "Error al registrar");
    }

    return data || {};
}

// Guardar sesión en el navegador
export function saveSession(token, user) {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
}

// Obtener token
export function getToken() {
    return localStorage.getItem("token");
}

// Obtener usuario
export function getUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
}

// Verificar si existe sesión
export function isAuthenticated() {
    return Boolean(getToken());
}

// Cerrar sesión
export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
}


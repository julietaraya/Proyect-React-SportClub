const API_URL = 'http://localhost:3000/api/users'

function getToken() {
    return localStorage.getItem('token')
}

function getHeaders() {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
    }
}

// Extrae el array/objeto real de la respuesta del backend,
// que envuelve todo en { ok, message, data }.
function unwrap(json) {
    return json?.data ?? json
}

export async function getUsers() {
    const response = await fetch(API_URL, {
        method: 'GET',
        headers: getHeaders()
    })
    if (!response.ok) {
        throw new Error('Error al obtener usuarios')
    }
    const json = await response.json()
    const data = unwrap(json)
    return Array.isArray(data) ? data : []
}

export async function createUser(userData) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(userData),
    })

    const json = await response.json()

    if (!response.ok) {
        throw new Error(json.message || 'Error al crear usuario')
    }

    return unwrap(json)
}

export async function updateUser(id, userData) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(userData),
    })

    const json = await response.json()

    if (!response.ok) {
        throw new Error(json.message || 'Error al actualizar usuario')
    }

    return unwrap(json)
}

export async function deleteUser(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
    })

    if (!response.ok) {
        throw new Error('Error al eliminar usuario')
    }

    return true
}

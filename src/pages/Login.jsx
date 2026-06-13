import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser, saveSession } from "../services/authServices"
import "../styles.css"

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [alerta, setAlerta] = useState("")
    const [cargando, setCargando] = useState(false)
    const navigate = useNavigate()

    const validarFormatoEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

    const redirigirPorRol = (rol) => {
        const rutas = { admin: "/admin/dashboard", coach: "/coach/dashboard", user: "/user/dashboard" }
        navigate(rutas[rol] || "/user/dashboard")
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorEmail("")
        setErrorPassword("")
        setAlerta("")

        let hayErrores = false
        if (!email.trim()) { setErrorEmail("El email es obligatorio"); hayErrores = true }
        else if (!validarFormatoEmail(email.trim())) { setErrorEmail("Formato de email inválido"); hayErrores = true }
        if (!password) { setErrorPassword("La contraseña es obligatoria"); hayErrores = true }
        if (hayErrores) return

        setCargando(true)
        try {
            const data = await loginUser({ email: email.trim(), password })
            saveSession(data.token, data.user)   // ← ajusta si tu backend envuelve en data.data
            redirigirPorRol(data.user.role)
        } catch (error) {
        setAlerta(error.message || "Error al iniciar sesión")
        } finally {
        setCargando(false)
        }
    }

    return (
    <div className="auth-page">
        <div className="auth-card">
        <div className="text-center mb-4">
            <img src="/assets/img/logo_empresa_letra_v1.png" alt="Logo SportClub" className="auth-logo" />
        </div>
        <h1 className="h3 text-center mb-4">Iniciar Sesión</h1>
        <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" id="email"
                className={`form-control ${errorEmail ? "is-invalid" : ""}`}
                placeholder="tucorreo@demo.cl" value={email}
                onChange={(e) => setEmail(e.target.value)} />
            {errorEmail && <div className="invalid-feedback">{errorEmail}</div>}
            </div>
            <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input type="password" id="password"
                className={`form-control ${errorPassword ? "is-invalid" : ""}`}
                placeholder="Ingresa tu contraseña" value={password}
                onChange={(e) => setPassword(e.target.value)} />
            {errorPassword && <div className="invalid-feedback">{errorPassword}</div>}
            </div>
            {alerta && <div className="alert alert-danger" role="alert">{alerta}</div>}
            <button type="submit" className="btn btn-primary w-100 mb-3" disabled={cargando}>
                <i className="bi bi-box-arrow-in-right"></i> {cargando ? "Ingresando…" : "Ingresar"}
            </button>
            <div className="text-center">
                <Link to="/" className="link-secondary me-3"><i className="bi bi-arrow-left"></i> Inicio</Link>
                <Link to="/registro" className="link-primary">¿No tienes cuenta? Regístrate</Link>
            </div>
            </form>
        </div>
    </div>
    )
}

export default Login
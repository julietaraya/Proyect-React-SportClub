import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { registerUser } from "../services/authService"
import "../styles/styles.css"
import "../styles/index.css" // estilos para login/registro

function Registro() {
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role] = useState("user")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()
        setMessage("")
        setLoading(true)

        try {
            await registerUser({ full_name: fullName, email, password })
            navigate("/login")
        } catch (error) {
            setMessage(error.message || "Error al registrar")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-card auth-card-wide">
                <div className="text-center mb-4">
                    <img src="/src/assets/logo_empresa_letra_v1.png" alt="Logo SportClub" className="auth-logo" />
                </div>
                <h1 className="h3 text-center mb-4">Crear cuenta</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="fullName">Nombre completo</label>
                        <input id="fullName" className="form-control" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input id="email" type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="password">Contraseña</label>
                        <input id="password" type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    {message && <div className="alert alert-danger" role="alert">{message}</div>}
                    <button type="submit" className="btn btn-primary w-100 mb-3" disabled={loading}>
                        {loading ? "Registrando…" : "Registrarme"}
                    </button>
                    <div className="text-center">
                        <Link to="/login" className="link-secondary">Volver al login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Registro
import { useEffect, useState } from "react"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { getUser, isAuthenticated, logout } from "../services/authServices"

function UserLayout() {
  const navigate = useNavigate()
  const [sidebarVisible, setSidebarVisible] = useState(false)
  const [menuAbierto, setMenuAbierto] = useState(false)
  const usuario = getUser()

  // Guard PROVISIONAL (ver nota sobre ProtectedRoute más abajo)
  useEffect(() => {
    if (!isAuthenticated() || !usuario) {
      navigate("/login")
      return
    }
    if (usuario.role !== "user") {
      const rutas = { admin: "/admin/dashboard", coach: "/coach/dashboard" }
      navigate(rutas[usuario.role] || "/login")
    }
  }, [navigate, usuario])

  const cerrarSesion = () => {
    logout()
    navigate("/login")
  }

  const primerNombre = (usuario?.full_name || "Usuario").split(" ")[0]
  const nombre = primerNombre.charAt(0).toUpperCase() + primerNombre.slice(1).toLowerCase()

  return (
    <>
      <nav className="navbar navbar-dark bg-primary px-3">
        <div className="d-flex align-items-center">
          <button className="btn btn-link text-white p-0 me-3 d-lg-none"
            onClick={() => setSidebarVisible((v) => !v)}>
            <i className="bi bi-list fs-4"></i>
          </button>
          <Link to="/user/dashboard" className="navbar-brand mb-0 h5">
            <img src="/assets/img/logo_empresa_letra_v1.png" alt="Logo SportClub"
              className="img-fluid navbar-icon" style={{ height: "30px", verticalAlign: "middle" }} />
          </Link>
        </div>
        <div className="dropdown">
          <button className="btn btn-link text-white text-decoration-none dropdown-toggle"
            onClick={() => setMenuAbierto((v) => !v)}>
            <i className="bi bi-person-circle"></i> <span>{nombre}</span>
          </button>
          <ul className={`dropdown-menu dropdown-menu-end ${menuAbierto ? "show" : ""}`}>
            <li><Link className="dropdown-item" to="/user/perfil"><i className="bi bi-person"></i> Mi perfil</Link></li>
            <li><hr className="dropdown-divider" /></li>
            <li><button className="dropdown-item" onClick={cerrarSesion}><i className="bi bi-box-arrow-right"></i> Cerrar sesión</button></li>
          </ul>
        </div>
      </nav>

      <div className="dashboard-layout">
        <aside className={`sidebar ${sidebarVisible ? "show" : ""}`}>
          <ul className="nav flex-column">
            <li className="nav-item"><Link className="nav-link active" to="/user/dashboard"><i className="bi bi-house-door"></i> Inicio</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/user/perfil"><i className="bi bi-person"></i> Mi Perfil</Link></li>
            <li className="nav-item"><a className="nav-link" href="#"><i className="bi bi-trophy"></i> Mis Deportes</a></li>
            <li className="nav-item"><a className="nav-link" href="#"><i className="bi bi-calendar-event"></i> Entrenamientos</a></li>
            <li className="nav-item mt-3"><button className="nav-link text-danger btn btn-link text-start" onClick={cerrarSesion}><i className="bi bi-box-arrow-right"></i> Cerrar Sesión</button></li>
          </ul>
        </aside>
        <main className="main-content"><Outlet /></main>
      </div>
    </>
  )
}

export default UserLayout
import { Link } from "react-router-dom"
import { getUser } from "../../services/authServices"
import "./styles.css"

const COLORES_ROL = { admin: "bg-danger", coach: "bg-primary", user: "bg-success" }

function formatearFecha(d) {
  const dd = String(d.getDate()).padStart(2, "0")
  const mm = String(d.getMonth() + 1).padStart(2, "0")
  const hh = String(d.getHours()).padStart(2, "0")
  const min = String(d.getMinutes()).padStart(2, "0")
  return `${dd}/${mm}/${d.getFullYear()} ${hh}:${min}`
}

function UserDashboard() {
  const usuario = getUser()
  const primerNombre = (usuario?.full_name || "usuario").split(" ")[0]
  const nombre = primerNombre.charAt(0).toUpperCase() + primerNombre.slice(1).toLowerCase()
  const fechaSesion = formatearFecha(new Date())
  const claseColor = COLORES_ROL[usuario?.role] || "bg-secondary"

  const stats = [
    { label: "Entrenamientos", valor: 12, icono: "bi-activity", color: "bg-primary-subtle text-primary" },
    { label: "Deportes activos", valor: 3, icono: "bi-trophy", color: "bg-success-subtle text-success" },
    { label: "Próxima clase", valor: "Lun", icono: "bi-calendar-check", color: "bg-warning-subtle text-warning" },
    { label: "Logros", valor: 5, icono: "bi-award", color: "bg-info-subtle text-info" },
  ]

  return (
    <>
      <div className="mb-4">
        <h1 className="h3 mb-1"><i className="bi bi-house-door text-primary"></i> Bienvenido, <span>{nombre}</span></h1>
        <p className="text-muted mb-0">Este es tu panel personal en SportClub</p>
      </div>

      <div className="row g-3 mb-4">
        {stats.map((s) => (
          <div className="col-sm-6 col-lg-3" key={s.label}>
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <p className="text-muted small mb-1">{s.label}</p>
                    <h3 className="mb-0">{s.valor}</h3>
                  </div>
                  <div className={`stat-icon ${s.color}`}><i className={`bi ${s.icono}`}></i></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-3">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white"><h5 className="mb-0"><i className="bi bi-info-circle text-primary"></i> Tu información</h5></div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 mb-3"><small className="text-muted d-block">Nombre completo</small><strong>{usuario?.full_name || "—"}</strong></div>
                <div className="col-md-6 mb-3"><small className="text-muted d-block">Email</small><strong>{(usuario?.email || "—").toLowerCase()}</strong></div>
                <div className="col-md-6 mb-3"><small className="text-muted d-block">Rol</small><span className={`badge ${claseColor}`}>{usuario?.role}</span></div>
                <div className="col-md-6 mb-3"><small className="text-muted d-block">Sesión iniciada</small><strong>{fechaSesion}</strong></div>
              </div>
              <Link to="/user/perfil" className="btn btn-outline-primary"><i className="bi bi-pencil"></i> Editar mi perfil</Link>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white"><h5 className="mb-0"><i className="bi bi-lightning text-primary"></i> Accesos rápidos</h5></div>
            <div className="list-group list-group-flush">
              <Link to="/user/perfil" className="list-group-item list-group-item-action"><i className="bi bi-person text-muted me-2"></i> Editar perfil</Link>
              <a href="#" className="list-group-item list-group-item-action"><i className="bi bi-key text-muted me-2"></i> Cambiar contraseña</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserDashboard

import React from "react";
import { Link } from "react-router-dom";
import { getUser } from "../../services/authService";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../styles/styles.css";
import "../../styles/themes.css";

function UserDashboard() {
  const usuario = getUser() || {};

  // Primer nombre capitalizado (igual que el HTML original)
  const primerNombre = (usuario.full_name || "Usuario").split(" ")[0];
  const nombreCapitalizado =
    primerNombre.charAt(0).toUpperCase() + primerNombre.slice(1).toLowerCase();

  // Badge de rol con los mismos colores del HTML original
  const colores = {
    admin: "bg-danger",
    coach: "bg-primary",
    user: "bg-success",
  };
  const claseColor = colores[usuario.role] || "bg-secondary";

  // Fecha/hora actual formateada dd/mm/yyyy hh:min
  const ahora = new Date();
  const dd = String(ahora.getDate()).padStart(2, "0");
  const mm = String(ahora.getMonth() + 1).padStart(2, "0");
  const yyyy = ahora.getFullYear();
  const hh = String(ahora.getHours()).padStart(2, "0");
  const min = String(ahora.getMinutes()).padStart(2, "0");
  const fechaSesion = `${dd}/${mm}/${yyyy} ${hh}:${min}`;

  return (
    <div className="dashboard-body">
      {/* Navbar */}
      <nav className="navbar navbar-dark bg-primary px-3">
        <div className="d-flex align-items-center">
          <span className="navbar-brand mb-0 h5">
            <img
              src="/src/assets/logo_empresa_letra_v1.png"
              alt="Logo SportClub"
              className="img-fluid navbar-icon"
              style={{ height: "30px", verticalAlign: "middle" }}
            />
          </span>
        </div>
        <div className="dropdown">
          <button
            className="btn btn-link text-white text-decoration-none dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            <i className="bi bi-person-circle"></i> {nombreCapitalizado}
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <Link className="dropdown-item" to="/perfil">
                <i className="bi bi-person"></i> Mi perfil
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link className="dropdown-item" to="/logout">
                <i className="bi bi-box-arrow-right"></i> Cerrar sesión
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="dashboard-layout">
        {/* Sidebar */}
        <aside className="sidebar" id="sidebar">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link className="nav-link active" to="/user/dashboard">
                <i className="bi bi-house-door"></i> Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/perfil">
                <i className="bi bi-person"></i> Mi Perfil
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="bi bi-trophy"></i> Mis Deportes
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="bi bi-calendar-event"></i> Entrenamientos
              </a>
            </li>
            <li className="nav-item mt-3">
              <Link className="nav-link text-danger" to="/logout">
                <i className="bi bi-box-arrow-right"></i> Cerrar Sesión
              </Link>
            </li>
          </ul>
        </aside>

        {/* Contenido principal */}
        <main className="main-content">
          <div className="mb-4">
            <h1 className="h3 mb-1">
              <i className="bi bi-house-door text-primary"></i> Bienvenido,{" "}
              {nombreCapitalizado}
            </h1>
            <p className="text-muted mb-0">
              Este es tu panel personal en SportClub
            </p>
          </div>

          {/* Tarjetas de estadísticas */}
          <div className="row g-3 mb-4">
            <div className="col-sm-6 col-lg-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <p className="text-muted small mb-1">Entrenamientos</p>
                      <h3 className="mb-0">12</h3>
                    </div>
                    <div className="stat-icon bg-primary-subtle text-primary">
                      <i className="bi bi-activity"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <p className="text-muted small mb-1">Deportes activos</p>
                      <h3 className="mb-0">3</h3>
                    </div>
                    <div className="stat-icon bg-success-subtle text-success">
                      <i className="bi bi-trophy"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <p className="text-muted small mb-1">Próxima clase</p>
                      <h3 className="mb-0">Lun</h3>
                    </div>
                    <div className="stat-icon bg-warning-subtle text-warning">
                      <i className="bi bi-calendar-check"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <p className="text-muted small mb-1">Logros</p>
                      <h3 className="mb-0">5</h3>
                    </div>
                    <div className="stat-icon bg-info-subtle text-info">
                      <i className="bi bi-award"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Información y accesos rápidos */}
          <div className="row g-3">
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white">
                  <h5 className="mb-0">
                    <i className="bi bi-info-circle text-primary"></i> Tu
                    información
                  </h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <small className="text-muted d-block">
                        Nombre completo
                      </small>
                      <strong>{usuario.full_name || "—"}</strong>
                    </div>
                    <div className="col-md-6 mb-3">
                      <small className="text-muted d-block">Email</small>
                      <strong>
                        {(usuario.email || "—").toLowerCase()}
                      </strong>
                    </div>
                    <div className="col-md-6 mb-3">
                      <small className="text-muted d-block">Rol</small>
                      <span className={`badge ${claseColor}`}>
                        {usuario.role}
                      </span>
                    </div>
                    <div className="col-md-6 mb-3">
                      <small className="text-muted d-block">
                        Sesión iniciada
                      </small>
                      <strong>{fechaSesion}</strong>
                    </div>
                  </div>
                  <Link to="/perfil" className="btn btn-outline-primary">
                    <i className="bi bi-pencil"></i> Editar mi perfil
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white">
                  <h5 className="mb-0">
                    <i className="bi bi-lightning text-primary"></i> Accesos
                    rápidos
                  </h5>
                </div>
                <div className="list-group list-group-flush">
                  <Link
                    to="/perfil"
                    className="list-group-item list-group-item-action"
                  >
                    <i className="bi bi-person text-muted me-2"></i> Editar
                    perfil
                  </Link>
                  <a
                    href="#"
                    className="list-group-item list-group-item-action"
                  >
                    <i className="bi bi-key text-muted me-2"></i> Cambiar
                    contraseña
                  </a>
                  <Link
                    to="/logout"
                    className="list-group-item list-group-item-action"
                  >
                    <i className="bi bi-box-arrow-right text-muted me-2"></i>{" "}
                    Cerrar sesión
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default UserDashboard;

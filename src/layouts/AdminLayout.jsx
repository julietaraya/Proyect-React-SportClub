import React from "react";
import { Link, Outlet } from "react-router-dom";
import { getUser } from "../services/authService";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/styles.css";
import "../styles/themes.css"; // temas por rol

function AdminLayout() {
  const usuario = getUser() || {};
  const primerNombre = (usuario.full_name || "Admin").split(" ")[0];
  const nombreCapitalizado =
    primerNombre.charAt(0).toUpperCase() + primerNombre.slice(1).toLowerCase();

  return (
    <div className="dashboard-body theme-admin">
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
              <Link className="nav-link" to="/admin/dashboard">
                <i className="bi bi-speedometer2"></i> Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/users">
                <i className="bi bi-people"></i> Usuarios
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/sports">
                <i className="bi bi-trophy"></i> Deportes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/perfil">
                <i className="bi bi-person"></i> Mi Perfil
              </Link>
            </li>
            <li className="nav-item mt-3">
              <Link className="nav-link text-danger" to="/logout">
                <i className="bi bi-box-arrow-right"></i> Cerrar Sesión
              </Link>
            </li>
          </ul>
        </aside>

        {/* Contenido de la ruta hija */}
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;

import React from "react";
import { Link } from "react-router-dom";
import { getUser } from "../../services/authService";
import Swal from "sweetalert2";
import "../../styles/themes.css";
import "../../styles/styles.css"; 

function AdminHome() {
  const usuario = getUser() || {};
  const primerNombre = (usuario.full_name || "Admin").split(" ")[0];
  const nombreCapitalizado =
    primerNombre.charAt(0).toUpperCase() + primerNombre.slice(1).toLowerCase();

  const colores = {
    admin: "bg-danger",
    coach: "bg-primary",
    user: "bg-success",
  };
  const claseColor = colores[usuario.role] || "bg-secondary";

  const ahora = new Date();
  const dd = String(ahora.getDate()).padStart(2, "0");
  const mm = String(ahora.getMonth() + 1).padStart(2, "0");
  const yyyy = ahora.getFullYear();
  const hh = String(ahora.getHours()).padStart(2, "0");
  const min = String(ahora.getMinutes()).padStart(2, "0");
  const fechaSesion = `${dd}/${mm}/${yyyy} ${hh}:${min}`;

  return (
    <>
      <div className="mb-4">
        <h1 className="h3 mb-1">
          <i className="bi bi-speedometer2 text-primary"></i> Panel de
          Administración
        </h1>
        <p className="text-muted mb-0">
          Bienvenido, {nombreCapitalizado}. Gestiona el sistema desde aquí.
        </p>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="row g-3 mb-4">
        <div className="col-sm-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-muted small mb-1">Usuarios totales</p>
                  <h3 className="mb-0">42</h3>
                </div>
                <div className="stat-icon bg-primary-subtle text-primary">
                  <i className="bi bi-people"></i>
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
                  <p className="text-muted small mb-1">Coaches</p>
                  <h3 className="mb-0">8</h3>
                </div>
                <div className="stat-icon bg-success-subtle text-success">
                  <i className="bi bi-person-badge"></i>
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
                  <h3 className="mb-0">15</h3>
                </div>
                <div className="stat-icon bg-warning-subtle text-warning">
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
                  <p className="text-muted small mb-1">Sesiones hoy</p>
                  <h3 className="mb-0">23</h3>
                </div>
                <div className="stat-icon bg-info-subtle text-info">
                  <i className="bi bi-activity"></i>
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
                  <small className="text-muted d-block">Nombre completo</small>
                  <strong>{usuario.full_name || "—"}</strong>
                </div>
                <div className="col-md-6 mb-3">
                  <small className="text-muted d-block">Email</small>
                  <strong>{(usuario.email || "—").toLowerCase()}</strong>
                </div>
                <div className="col-md-6 mb-3">
                  <small className="text-muted d-block">Rol</small>
                  <span className={`badge ${claseColor}`}>{usuario.role}</span>
                </div>
                <div className="col-md-6 mb-3">
                  <small className="text-muted d-block">Sesión iniciada</small>
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
                <i className="bi bi-lightning text-primary"></i> Accesos rápidos
              </h5>
            </div>
            <div className="list-group list-group-flush">
              <Link
                to="/admin/users"
                className="list-group-item list-group-item-action"
              >
                <i className="bi bi-people text-muted me-2"></i> Gestionar
                usuarios
              </Link>
              <Link
                to="/admin/sports"
                className="list-group-item list-group-item-action"
              >
                <i className="bi bi-trophy text-muted me-2"></i> Gestionar
                deportes
              </Link>
              <Link
                to="/logout"
                className="list-group-item list-group-item-action"
              >
                <i className="bi bi-box-arrow-right text-muted me-2"></i> Cerrar
                sesión
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminHome;

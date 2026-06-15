import { Link } from "react-router-dom";
import logoText from "../assets/logo_empresa_letra_v1.png";
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/styles.css";
import "../styles/index.css";

function Home() {
  // Script de redirección según token y rol
  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user") || "null");
    const t = localStorage.getItem("token");
    if (t && u) {
      const rutas = {
        admin: "/admin/dashboard",
        coach: "/coach/dashboard",
        user: "/user/dashboard",
      };
      window.location.href = rutas[u.role] || "/user/dashboard";
    }
  }, []);

  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm landing-navbar">
        <div className="container">
          <Link className="navbar-brand fw-bold mx-auto" to="/">
            <img
              src="/src/assets/icon2.png"
              alt="Logo SportClub"
              className="img-fluid navbar-icon d-block mx-auto"
              style={{ height: "30px", verticalAlign: "middle" }}
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#menuPrincipal"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="menuPrincipal"
          >
            <Link to="/login" className="btn btn-outline-primary me-2">
              <i className="bi bi-box-arrow-in-right"></i> Iniciar Sesión
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section hero-with-bg">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 text-center text-lg-start">
              <h1 className="display-4 fw-bold mb-3">
                Tu club deportivo,{" "}
                <span className="text-primary">en un solo lugar</span>
              </h1>
              <p className="lead text-dark mb-4">
                Gestiona tus entrenamientos, conecta con coaches y sigue tu
                progreso deportivo desde cualquier dispositivo.
              </p>
              <div className="d-flex gap-2 justify-content-center justify-content-lg-start">
                <Link to="/register" className="btn btn-primary btn-lg">
                  Comenzar ahora <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </div>
            <div className="col-lg-6 text-center mt-5 mt-lg-0">
              <div className="hero-image-wrapper">
                <img
                  src="/src/assets/logo_empresa_letra_v1.png"
                  alt="Logo SportClub"
                  className="img-fluid hero-icon"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">
            ¿Qué puedes hacer en SportClub?
          </h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm text-center p-4">
                <div className="feature-icon mx-auto mb-3">
                  <i className="bi bi-person-circle"></i>
                </div>
                <h5 className="fw-bold">Gestiona tu perfil</h5>
                <p className="text-muted mb-0">
                  Personaliza tus datos, tus deportes favoritos y mantén tu
                  información actualizada.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm text-center p-4">
                <div className="feature-icon mx-auto mb-3">
                  <i className="bi bi-people-fill"></i>
                </div>
                <h5 className="fw-bold">Conecta con coaches</h5>
                <p className="text-muted mb-0">
                  Encuentra entrenadores certificados según tu deporte y nivel
                  de experiencia.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm text-center p-4">
                <div className="feature-icon mx-auto mb-3">
                  <i className="bi bi-graph-up-arrow"></i>
                </div>
                <h5 className="fw-bold">Sigue tu progreso</h5>
                <p className="text-muted mb-0">
                  Lleva el control de tus entrenamientos y mira cómo avanzas
                  semana a semana.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container text-center text-muted small">
          © 2026 SportClub - Desarrollado por Juliet Araya Evaluación TI3031
        </div>
      </footer>
    </div>
  );
}

export default Home;

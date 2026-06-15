import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // borra datos de sesión
    navigate("/login"); // redirige al login
  };

  return (
    <button className="btn btn-danger w-100 mt-3" onClick={handleLogout}>
      Cerrar Sesión
    </button>
  );
}

export default LogoutButton;

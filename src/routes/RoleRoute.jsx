import { Navigate } from "react-router-dom";
import { getUser, isAuthenticated } from "../services/authService";
import React from "react";

function RoleRoute({ allowedRoles, children }) {
  // Recupera el rol desde localStorage (lo guardas al hacer login)
  const role = localStorage.getItem("role");

  // Si el rol está dentro de los permitidos, renderiza el contenido
  if (allowedRoles.includes(role)) {
    return children;
  }

  // Si no, redirige a la página de Unauthorized
  return <Navigate to="/unauthorized" replace />;
}

export default RoleRoute;

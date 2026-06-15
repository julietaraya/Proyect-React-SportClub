import React from "react";
import { Nav } from "react-bootstrap";
import LogoutButton from "./LogoutButton";

function Sidebar({ role }) {
  let bgClass = "bg-primary"; // azul por defecto
  if (role === "admin") bgClass = "bg-purple"; // morado (defínelo en tu CSS)
  if (role === "coach") bgClass = "bg-success"; // verde

  return (
    <div className={`${bgClass} text-white min-vh-100 p-3`}>
      <h3 className="mb-4">SportClub</h3>
      <Nav className="flex-column">
        <Nav.Link href="/" className="text-white">
          Inicio
        </Nav.Link>
        <Nav.Link href="/user/dashboard" className="text-white">
          Usuario
        </Nav.Link>
        <Nav.Link href="/coach/dashboard" className="text-white">
          Coach
        </Nav.Link>
        <Nav.Link href="/admin/dashboard" className="text-white">
          Admin
        </Nav.Link>
      </Nav>
      <LogoutButton />
    </div>
  );
}

export default Sidebar;

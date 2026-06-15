import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import "../styles/styles.css";
import "../styles/index.css"; // estilos para login/registro

function Login({ setIsAuth, setUserRole }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Guardar token y usuario en localStorage
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));

        // Actualizar estado global
        setIsAuth(true);
        setUserRole(data.data.user.role);

        // Redirigir según rol
        if (data.data.user.role === "user") navigate("/user/UserDashboard");
        if (data.data.user.role === "coach") navigate("/coach/CoachDashboard");
        if (data.data.user.role === "admin") navigate("/admin/AdminDashboard");
      } else {
        setError(data.message || "Credenciales inválidas");
      }
    } catch (err) {
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div className="auth-page">
      <Card className="auth-card">
        <h2 className="mb-4 text-center">Iniciar Sesión</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100">
            Iniciar Sesión
          </Button>
        </Form>

        {/* Bloque con enlaces juntos */}
        <div className="mt-3 text-center d-flex justify-content-between">
          <Link to="/register">¿No tienes cuenta? Regístrate</Link>
          <Link to="/" className="text-muted">
            Volver al inicio
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default Login;

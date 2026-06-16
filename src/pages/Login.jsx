import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import "../styles/styles.css";
import "../styles/index.css"; // estilos para login/registro

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

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
        const token = data.data.token;
        const user = data.data.user;

        // Guardar sesión (incluido role suelto, que RoleRoute necesita)
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("role", user.role);

        // Redirigir a las rutas que SÍ existen en AppRoutes
        if (user.role === "user") navigate("/user/dashboard");
        else if (user.role === "coach") navigate("/coach/dashboard");
        else if (user.role === "admin") navigate("/admin/dashboard");
      } else {
        setError(data.message || "Credenciales inválidas");
      }
    } catch (err) {
      console.error("Error real en login:", err);
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

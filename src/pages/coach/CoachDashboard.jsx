import React from "react";
import { Navbar, Nav, Container, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../styles/styles.css";
import "../../styles/coach.css"; // estilos verde

function CoachDashboard() {
  const navigate = useNavigate();

  return (
    <>
      <div className="coach-dashboard">
        <Navbar className="header" variant="dark">
          <Navbar.Brand>SportClub</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="/profile">Mi Perfil</Nav.Link>
            <Nav.Link href="/logout">Cerrar Sesión</Nav.Link>
          </Nav>
        </Navbar>

        <Container className="mt-4">
          <h2>Dashboard Coach</h2>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Mis Alumnos</Card.Title>
              <Card.Text>Administra la información de tus alumnos.</Card.Text>
              <Button variant="success">Ver Alumnos</Button>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <Card.Title>Clases Programadas</Card.Title>
              <Card.Text>Consulta y organiza tus clases.</Card.Text>
              <Button variant="success">Ver Clases</Button>
            </Card.Body>
          </Card>
        </Container>
      </div>
      <Col md={2} className="bg-success text-white min-vh-100 p-3">
        ...
      </Col>
    </>
  );
}

export default CoachDashboard;

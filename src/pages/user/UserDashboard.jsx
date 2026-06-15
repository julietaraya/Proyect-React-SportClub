import React from 'react';
import { Navbar, Nav, Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import '../../styles/styles.css'
import '../../styles/user.css' // estilos azul

function UserDashboard() {
  return (
    <><div className="user-dashboard">
      {/* Header */}
      <Navbar className="header" variant="dark">
        <Navbar.Brand>SportClub</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link href="/profile">Mi Perfil</Nav.Link>
          <Nav.Link href="/logout">Cerrar Sesión</Nav.Link>
        </Nav>
      </Navbar>

      {/* Contenido principal */}
      <Container className="mt-4">
        <h2>Dashboard Usuario</h2>

        <Card className="mb-3">
          <Card.Body>
            <Card.Title>Mis Reservas</Card.Title>
            <Card.Text>
              Aquí verás tus reservas de clases y entrenamientos.
            </Card.Text>
            <Button variant="primary">Ver Reservas</Button>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <Card.Title>Clases Disponibles</Card.Title>
            <Card.Text>
              Explora las clases que puedes reservar.
            </Card.Text>
            <Button variant="primary">Explorar Clases</Button>
          </Card.Body>
        </Card>
      </Container>
    </div><Col md={2} className="bg-primary text-white min-vh-100 p-3">...</Col></>
  );
}

export default UserDashboard;

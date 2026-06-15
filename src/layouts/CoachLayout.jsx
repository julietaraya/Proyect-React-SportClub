import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import '../styles/coach.css';
import '../styles/styles.css';

function CoachLayout({ children }) {
  return (
    <div>
      <Navbar className="header" variant="dark">
        <Navbar.Brand>SportClub</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link href="/profile">Mi Perfil</Nav.Link>
          <Nav.Link href="/logout">Cerrar Sesión</Nav.Link>
        </Nav>
      </Navbar>
      <Container className="mt-4">
        {children}
      </Container>
    </div>
  );
}

export default CoachLayout;

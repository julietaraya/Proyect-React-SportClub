import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import {
  Table,
  Button,
  Modal,
  Form,
  Container,
  Row,
  Col,
  Nav,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../../styles/themes.css";
import "../../styles/styles.css"; // estilos generales

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    role: "user",
  });

  useEffect(() => {
    setUsers([
      {
        id: 1,
        full_name: "Demo User 1",
        email: "user1@demo.cl",
        role: "user",
        fecha_registro: "07/05/2026",
      },
      {
        id: 2,
        full_name: "Demo Coach 1",
        email: "coach1@demo.cl",
        role: "coach",
        fecha_registro: "07/05/2026",
      },
      {
        id: 3,
        full_name: "Demo Admin 1",
        email: "admin1@demo.cl",
        role: "admin",
        fecha_registro: "07/05/2026",
      },
    ]);
  }, []);

  const handleShowModal = (user = null) => {
    setEditingUser(user);
    setFormData(user || { full_name: "", email: "", role: "user" });
    setShowModal(true);
  };

  const handleSave = () => {
    if (editingUser) {
      setUsers(
        users.map((u) =>
          u.id === editingUser.id ? { ...formData, id: u.id } : u,
        ),
      );
    } else {
      setUsers([
        ...users,
        {
          ...formData,
          id: Date.now(),
          fecha_registro: new Date().toLocaleDateString(),
        },
      ]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Eliminar usuario?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        setUsers(users.filter((u) => u.id !== id));
        Swal.fire("Eliminado", "El usuario ha sido eliminado", "success");
      }
    });
  };

  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col md={2} className="bg-primary text-white min-vh-100 p-3">
          <h3 className="mb-4">SportClub</h3>
          <Nav className="flex-column">
            <Nav.Link href="/admin/dashboard" className="text-white">
              Dashboard
            </Nav.Link>
            <Nav.Link href="/admin/users" className="text-white active">
              Usuarios
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/sports" className="text-white">
              Deportes
            </Nav.Link>
            <Nav.Link as={Link} to="/perfil">
              Mi Perfil
            </Nav.Link>
            <Nav.Link as={Link} to="/logout">
              Cerrar Sesión
            </Nav.Link>
          </Nav>
        </Col>

        {/* Main content */}
        <Col md={10} className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Lista de Usuarios</h2>
            <Button variant="primary" onClick={() => handleShowModal()}>
              + Nuevo Usuario
            </Button>
          </div>

          <Table striped bordered hover responsive>
            <thead className="table-primary">
              <tr>
                <th>ID</th>
                <th>Nombre Completo</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Fecha Registro</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.full_name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.fecha_registro}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleShowModal(user)}
                    >
                      ✏️
                    </Button>{" "}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(user.id)}
                    >
                      🗑️
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Modal Crear/Editar */}
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>
                {editingUser ? "Editar Usuario" : "Crear Usuario"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre completo</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.full_name}
                    onChange={(e) =>
                      setFormData({ ...formData, full_name: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Rol</Form.Label>
                  <Form.Select
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                  >
                    <option value="user">Usuario</option>
                    <option value="coach">Coach</option>
                    <option value="admin">Administrador</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={handleSave}>
                Guardar
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>

        <Col md={2} className="bg-purple text-white min-vh-100 p-3">
          <h3 className="mb-4">SportClub</h3>
          <Nav className="flex-column">
            <Nav.Link href="/admin/dashboard" className="text-white">
              Dashboard
            </Nav.Link>
            <Nav.Link href="/admin/users" className="text-white active">
              Usuarios
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/sports" className="text-white">
              Deportes
            </Nav.Link>
            <Nav.Link as={Link} to="/miperfil">
              Mi Perfil
            </Nav.Link>
            <Nav.Link as={Link} to="/logout">
            Cerrar Sesión
            </Nav.Link>
          </Nav>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDashboard;

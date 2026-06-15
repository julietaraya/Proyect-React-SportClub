import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { getSports, createSport, updateSport, deleteSport, changeStatus } from "../../services/sportsService";
import Swal from "sweetalert2";

function SportsPage() {
  const [sports, setSports] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingSport, setEditingSport] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    objective: "",
    duration: "",
    status: true,
  });

  const fetchSports = async () => {
    const data = await getSports();
    setSports(data);
  };

  useEffect(() => {
    fetchSports();
  }, []);

  const handleShowModal = (sport = null) => {
    setEditingSport(sport);
    setFormData(
      sport || { name: "", objective: "", duration: "", status: true },
    );
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      if (editingSport) {
        await updateSport(editingSport.id, formData);
        Swal.fire(
          "Actualizado",
          "Deporte actualizado correctamente",
          "success",
        );
      } else {
        await createSport(formData);
        Swal.fire("Creado", "Deporte creado correctamente", "success");
      }
      setShowModal(false);
      fetchSports();
    } catch (err) {
      Swal.fire("Error", "No se pudo guardar el deporte", "error");
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "¿Eliminar deporte?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteSport(id);
        Swal.fire("Eliminado", "Deporte eliminado correctamente", "success");
        fetchSports();
      }
    });
  };

  const handleStatusChange = async (sport) => {
    await changeStatus(sport.id, !sport.status);
    fetchSports();
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Gestión de Deportes</h2>
        <div>
          <Button variant="secondary" className="me-2" onClick={fetchSports}>
            Refrescar
          </Button>
          <Button variant="primary" onClick={() => handleShowModal()}>
            + Nuevo Deporte
          </Button>
        </div>
      </div>

      <Table striped bordered hover responsive>
        <thead className="table-primary">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Objetivo</th>
            <th>Duración (min)</th>
            <th>Estado</th>
            <th>Fecha creación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sports.map((sport) => (
            <tr key={sport.id}>
              <td>{sport.id}</td>
              <td>{sport.name}</td>
              <td>{sport.objective}</td>
              <td>{sport.duration}</td>
              <td>
                <Form.Check
                  type="switch"
                  checked={sport.status}
                  onChange={() => handleStatusChange(sport)}
                />
              </td>
              <td>{formatDate(sport.created_at)}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleShowModal(sport)}
                >
                  ✏️
                </Button>{" "}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(sport.id)}
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
            {editingSport ? "Editar Deporte" : "Crear Deporte"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Objetivo</Form.Label>
              <Form.Control
                type="text"
                value={formData.objective}
                onChange={(e) =>
                  setFormData({ ...formData, objective: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Duración (minutos)</Form.Label>
              <Form.Control
                type="number"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
              />
            </Form.Group>
            <Form.Check
              type="switch"
              label="Activo"
              checked={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.checked })
              }
            />
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
    </div>
  );
}

export default SportsPage;

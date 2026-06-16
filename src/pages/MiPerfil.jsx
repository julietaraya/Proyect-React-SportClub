import { Card, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getUser } from "../services/authService";
import "../styles/styles.css";

function MiPerfil() {
  const navigate = useNavigate();
  const user = getUser();

  if (!user) {
    navigate("/login", { replace: true });
    return null;
  }

  return (
    <Container className="mt-5">
      <Card className="shadow-sm">
        <Card.Body>
          <h2 className="mb-4">Mi Perfil</h2>
          <p>
            <strong>Nombre:</strong> {user.full_name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Rol:</strong> {user.role}
          </p>
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Volver
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default MiPerfil;

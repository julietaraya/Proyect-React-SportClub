import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    logout(); // limpia token, user, role
    navigate("/login", { replace: true });
  }, [navigate]);

  return null;
}

export default Logout;

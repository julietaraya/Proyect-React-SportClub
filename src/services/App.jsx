import { use, useEffect, useState } from "react";
import UserCard from "../components/Navbar"
import "./App.css"
import { getUsers } from "./services/userService";

function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    getUsers()
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="message">Cargando usuarios...</p>
  }

  if (error) {
    return <p className="message error">Error: {error}</p>
  }
  
  return (
    <main className="container">
      <h1>Usuarios desde API</h1>    
      <p className="subtitle">
          Datos obtenidos desde una API pública y renderizados con componentes React.
      </p>

      <section className="users-grid">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </section>
    </main>
  );
}

export default App;
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [cedula, setCedula] = useState("");
  const [invitados, setInvitados] = useState("");
  const [horas, setHoras] = useState("");
  const [fiestas, setFiestas] = useState([]);

  // === Registrar nueva fiesta ===
  const registrarFiesta = async (e) => {
    e.preventDefault();
    if (!cedula || !invitados || !horas) {
      alert("Por favor, completa todos los campos antes de registrar.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:4000/fiestas", {
        cedula,
        invitados: Number(invitados),
        horas: Number(horas),
      });
      setFiestas([...fiestas, res.data]);
      setCedula("");
      setInvitados("");
      setHoras("");
    } catch (error) {
      console.error("Error al registrar la fiesta:", error);
      alert("Hubo un problema al registrar la fiesta.");
    }
  };

  // === Obtener todas las fiestas ===
  useEffect(() => {
    axios
      .get("http://localhost:4000/fiestas")
      .then((res) => setFiestas(res.data))
      .catch((err) => console.error("Error al obtener fiestas:", err));
  }, []);

  return (
    <div className="app-wrapper">
      {/* Barra superior */}
      <nav className="navbar">
        <h2>Panel de Administración</h2>
      </nav>

      {/* Contenido principal */}
      <main className="container">
        <header>
          <h1>Fiestas y Eventos Tarragona</h1>
          <p>Registro y control de eventos en la base de datos</p>
        </header>

        {/* Formulario */}
        <section className="card">
          <h3>Registrar nueva fiesta</h3>
          <form onSubmit={registrarFiesta}>
            <input
              type="text"
              placeholder="Cédula"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
            />
            <input
              type="number"
              placeholder="Cantidad de invitados"
              value={invitados}
              onChange={(e) => setInvitados(e.target.value)}
            />
            <input
              type="number"
              placeholder="Horas de fiesta"
              value={horas}
              onChange={(e) => setHoras(e.target.value)}
            />
            <button type="submit">Registrar Fiesta</button>
          </form>
        </section>

        {/* Tabla de registros */}
        <section className="card">
          <h3>Listado de Fiestas Registradas</h3>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Cédula</th>
                  <th>Invitados</th>
                  <th>Horas</th>
                  <th>Monto</th>
                </tr>
              </thead>
              <tbody>
                {fiestas.length > 0 ? (
                  fiestas.map((f, i) => (
                    <tr key={i}>
                      <td>{f.cedula}</td>
                      <td>{f.invitados}</td>
                      <td>{f.horas}</td>
                      <td>${f.monto.toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No hay registros aún.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Pie de página */}
      <footer>
        <p>© 2025 Fiestas Tarragona — Sistema de Gestión Interna</p>
      </footer>
    </div>
  );
}

export default App;



import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [cedula, setCedula] = useState("");
  const [invitados, setInvitados] = useState("");
  const [horas, setHoras] = useState("");
  const [fiestas, setFiestas] = useState([]);

  const registrarFiesta = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:4000/fiestas", {
      cedula,
      invitados: Number(invitados),
      horas: Number(horas)
    });
    setFiestas([...fiestas, res.data]);
    setCedula("");
    setInvitados("");
    setHoras("");
  };

  useEffect(() => {
    axios.get("http://localhost:4000/fiestas").then(res => setFiestas(res.data));
  }, []);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Fiestas y Eventos Tarragona</h1>

      <form onSubmit={registrarFiesta} className="space-y-3 bg-gray-100 p-4 rounded-lg shadow">
        <input className="w-full p-2 border rounded" placeholder="Cédula"
          value={cedula} onChange={e => setCedula(e.target.value)} />
        <input className="w-full p-2 border rounded" placeholder="Cantidad de invitados"
          value={invitados} onChange={e => setInvitados(e.target.value)} />
        <input className="w-full p-2 border rounded" placeholder="Horas de fiesta"
          value={horas} onChange={e => setHoras(e.target.value)} />
        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600">
          Registrar Fiesta
        </button>
      </form>

      <h2 className="text-xl mt-6 mb-2 font-semibold">Fiestas registradas</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Cédula</th>
            <th>Invitados</th>
            <th>Horas</th>
            <th>Monto</th>
          </tr>
        </thead>
        <tbody>
          {fiestas.map((f, i) => (
            <tr key={i} className="text-center border-t">
              <td>{f.cedula}</td>
              <td>{f.invitados}</td>
              <td>{f.horas}</td>
              <td>${f.monto.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;


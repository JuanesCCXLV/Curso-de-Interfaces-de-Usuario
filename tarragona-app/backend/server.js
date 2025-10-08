const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch(err => console.log("Error de conexión:", err));

// Modelo
const Fiesta = require("./models/Fiesta");

// Rutas básicas
app.post("/fiestas", async (req, res) => {
  try {
    const { cedula, invitados, horas } = req.body;
    let tarifa = invitados <= 100 ? 8000 : invitados <= 500 ? 6000 : 4000;
    let adicional = horas <= 3 ? 100000 : horas <= 6 ? 200000 : 300000;
    let monto = (invitados * tarifa) + adicional;

    const fiesta = new Fiesta({ cedula, invitados, horas, monto });
    await fiesta.save();
    res.json(fiesta);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/fiestas", async (req, res) => {
  const fiestas = await Fiesta.find();
  res.json(fiestas);
});

app.listen(4000, () => console.log("Servidor corriendo en puerto 4000"));

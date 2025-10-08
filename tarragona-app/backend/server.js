require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch(err => console.log("❌ Error de conexión:", err));

// Modelo de Fiesta
const Fiesta = require('./models/Fiesta');

// Ruta para registrar una fiesta
app.post('/fiestas', async (req, res) => {
  try {
    const { cedula, invitados, horas } = req.body;

    // Calcular monto
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

// Ruta para obtener todas las fiestas
app.get('/fiestas', async (req, res) => {
  try {
    const fiestas = await Fiesta.find();
    res.json(fiestas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Iniciar servidor
const PORT = 4000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));


const mongoose = require("mongoose");

const FiestaSchema = new mongoose.Schema({
  cedula: String,
  invitados: Number,
  horas: Number,
  monto: Number
});

module.exports = mongoose.model("Fiesta", FiestaSchema);

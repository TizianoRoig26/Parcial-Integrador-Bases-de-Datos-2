import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  direccion: { type: String, required: false },
  telefono: { type: String, required: false },
  contrasenia: {type: String, require: true},
  rol: { type: String, enum: ["CLIENTE", "ADMIN"], default: "CLIENTE" },
  eliminado: { type: Boolean, default: false },
  carrito: { type: mongoose.Schema.Types.ObjectId, ref: "Carrito" }
}, { timestamps: true });

export default mongoose.model("Usuario", usuarioSchema);

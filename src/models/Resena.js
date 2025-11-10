import mongoose from "mongoose";

const resenaSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
  productoId: { type: mongoose.Schema.Types.ObjectId, ref: "Producto", required: true },
  comentario: {type: String},
  calificacion: { type: Number, min: 1, max: 5 },
  eliminado: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("Resena", resenaSchema);

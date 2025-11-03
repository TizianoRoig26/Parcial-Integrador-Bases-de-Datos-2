import mongoose from "mongoose";

const resenaSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
  productoId: { type: mongoose.Schema.Types.ObjectId, ref: "Producto", required: true },
  comentario: String,
  calificacion: { type: Number, min: 1, max: 5 }
}, { timestamps: true });

export default mongoose.model("Resena", resenaSchema);

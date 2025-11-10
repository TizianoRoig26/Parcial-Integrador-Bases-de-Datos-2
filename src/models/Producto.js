import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  marca: { type: String, required: true },
  descripcion: { type: String, required: false },
  precio: { type: Number, required: true, min : 0 },
  stock: { type: Number, default: 0, min : 0 },
  categoria: { type: mongoose.Schema.Types.ObjectId, ref: "Categoria"},
  resena: { type: mongoose.Schema.Types.ObjectId, ref: "Resena" },
  eliminado: { type: Boolean, default: false }
}, { timestamps: false });

export default mongoose.model("Producto", productoSchema);

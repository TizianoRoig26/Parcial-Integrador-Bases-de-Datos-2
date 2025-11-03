import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: String,
  precio: { type: Number, required: true },
  marca: String,
  stock: { type: Number, default: 0 },
  categoria: { type: mongoose.Schema.Types.ObjectId, ref: "Categoria" }
}, { timestamps: true });

export default mongoose.model("Producto", productoSchema);

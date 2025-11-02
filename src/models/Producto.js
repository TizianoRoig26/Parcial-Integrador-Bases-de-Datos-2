import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  precio: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  categoria: { type: String },
  creadoEn: { type: Date, default: Date.now },
});

export default mongoose.model("Producto", productoSchema);

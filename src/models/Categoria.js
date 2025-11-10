import mongoose from "mongoose";

const categoriaSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
  descripcion: { type: String},
  productos: {type: [mongoose.Schema.Types.ObjectId],ref: "Producto", default: []},
  eliminado: { type: Boolean, default: false }
}, { timestamps: false });

export default mongoose.model("Categoria", categoriaSchema);

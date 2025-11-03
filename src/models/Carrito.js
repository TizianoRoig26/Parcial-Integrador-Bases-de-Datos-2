import mongoose from "mongoose";

const carritoSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
  productos: [
    {
      productoId: { type: mongoose.Schema.Types.ObjectId, ref: "Producto" },
      cantidad: { type: Number, default: 1 }
    }
  ]
}, { timestamps: true });

export default mongoose.model("Carrito", carritoSchema);

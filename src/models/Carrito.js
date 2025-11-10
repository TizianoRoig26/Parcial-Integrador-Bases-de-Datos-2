import mongoose from "mongoose";

const carritoSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
    productos: [
    {
    producto: { type: mongoose.Schema.Types.ObjectId, ref: "Producto", required: true },
    cantidad: { type: Number, default: 1 }
    }
    ],
  eliminado: { type: Boolean, default: false }
}, { timestamps: false });

export default mongoose.model("Carrito", carritoSchema);

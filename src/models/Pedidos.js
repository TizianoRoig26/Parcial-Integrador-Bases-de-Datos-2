import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
  productos: [
    {
      producto: { type: mongoose.Schema.Types.ObjectId, ref: "Producto", required: true },
      cantidad: { type: Number, required: true },
      precioUnitario: { type: Number, required: true }
    }
  ],
  total: { type: Number, required: true },
  estado: {
    type: String,
    enum: ["PENDIENTE", "CONFIRMADO", "CANCELADO", "TERMINADO"],
    default: "PENDIENTE"
  },
  fecha: { type: Date, default: Date.now }
});

export default mongoose.model("Pedido", pedidoSchema);

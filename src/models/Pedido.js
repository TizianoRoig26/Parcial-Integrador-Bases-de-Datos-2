import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
  productos: [
    {
      producto: { type: mongoose.Schema.Types.ObjectId, ref: "Producto", required: true },
      cantidad: { type: Number, required: true, min: 1},
      precioUnitario: { type: Number, required: true }
    }
  ],
  total: { type: Number, min: 0},
  estado: {
    type: String,
    enum: ["PENDIENTE", "CONFIRMADO", "CANCELADO", "TERMINADO", "PROCESO"],
    default: "PENDIENTE"
  },
  metodoPago: {
    type: String,
    enum: ["EFECTIVO", "TRANSFERENCIA", "TARJETA"],
    require: true
  },
  fecha: { type: Date, default: Date.now },
  eliminado: { type: Boolean, default: false }
});

export default mongoose.model("Pedido", pedidoSchema);

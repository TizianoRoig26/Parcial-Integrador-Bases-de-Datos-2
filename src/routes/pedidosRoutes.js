import express from "express";
import {
  crearOrden,
  obtenerOrdenes,
  obtenerOrdenPorId,
  actualizarOrden,
  eliminarOrden,
  obtenerOrdenesPorUsuario,
  obtenerStatsOrdenes,
  actualizarEstadoOrden
} from "../controllers/pedidoController.js";
import {validarToken, requiereAdmin} from "../middleware/jwt.js";
const router = express.Router();


router.post("/", validarToken, crearOrden);
router.get("/", validarToken, obtenerOrdenes);
router.get("/:id", validarToken, obtenerOrdenPorId);
router.put("/:id", validarToken, requiereAdmin, actualizarOrden);
router.put("/eliminar/:id", validarToken, requiereAdmin, eliminarOrden);

router.get("/usuario/:userId", validarToken, requiereAdmin, obtenerOrdenesPorUsuario);
router.get("/stats/data", validarToken, requiereAdmin, obtenerStatsOrdenes);
router.patch("/:id/status", validarToken, requiereAdmin, actualizarEstadoOrden);

export default router;

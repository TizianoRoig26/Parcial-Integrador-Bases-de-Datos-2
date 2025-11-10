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


router.post("/", crearOrden, validarToken);
router.get("/", obtenerOrdenes, validarToken);
router.get("/:id", obtenerOrdenPorId, validarToken);
router.put("/:id", actualizarOrden, validarToken, requiereAdmin);
router.put("/eliminar/:id", eliminarOrden, validarToken, requiereAdmin);

router.get("/usuario/:userId", obtenerOrdenesPorUsuario, validarToken, requiereAdmin);
router.get("/stats/data", obtenerStatsOrdenes, validarToken, requiereAdmin);
router.patch("/:id/status", actualizarEstadoOrden, validarToken, requiereAdmin);

export default router;

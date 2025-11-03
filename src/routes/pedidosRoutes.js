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

const router = express.Router();

// CRUD normal
router.post("/", crearOrden);
router.get("/", obtenerOrdenes);
router.get("/:id", obtenerOrdenPorId);
router.put("/:id", actualizarOrden);
router.delete("/:id", eliminarOrden);

// Rutas extras
router.get("/user/:userId", obtenerOrdenesPorUsuario);
router.get("/stats/data", obtenerStatsOrdenes);
router.patch("/:id/status", actualizarEstadoOrden);

export default router;

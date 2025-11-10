import express from "express";
import {
  crearCarrito,
  listarCarritos,
  obtenerCarrito,
  actualizarCarrito,
  eliminarCarrito,
  mostrarCarritoUsuario,
  totalCarrito,
  agregarProductosAlCarrito
} from "../controllers/carritoController.js";
import {validarToken, requiereAdmin} from "../middleware/jwt.js";

const router = express.Router();

router.post("/", crearCarrito, validarToken);
router.get("/", listarCarritos, validarToken);
router.get("/:id", obtenerCarrito, validarToken);
router.patch("/:id", actualizarCarrito, validarToken);
router.patch("/eliminar/:id", eliminarCarrito, validarToken);
router.get("/:usuarioId/total", totalCarrito, validarToken);
router.get("/:usuarioId", mostrarCarritoUsuario, validarToken);
router.post("/agregarProducto", agregarProductosAlCarrito, validarToken);

export default router;

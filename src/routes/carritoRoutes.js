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

router.post("/", validarToken, crearCarrito);
router.get("/", validarToken, listarCarritos);
router.get("/:id", validarToken, obtenerCarrito);
router.patch("/:id", validarToken, actualizarCarrito);
router.patch("/eliminar/:id", validarToken, eliminarCarrito);
router.get("/:usuarioId/total", validarToken, totalCarrito);
router.get("/usuario/:usuarioId", validarToken, mostrarCarritoUsuario);
router.put("/:carritoId/agregar-producto", validarToken, agregarProductosAlCarrito);

export default router;

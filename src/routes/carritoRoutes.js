import express from "express";
import {
  crearCarrito,
  listarCarritos,
  obtenerCarrito,
  actualizarCarrito,
  eliminarCarrito,
  mostrarCarritoUsuario,
  totalCarrito
} from "../controllers/carritoController.js";

const router = express.Router();

router.post("/", crearCarrito);
router.get("/", listarCarritos);
router.get("/:id", obtenerCarrito);
router.put("/:id", actualizarCarrito);
router.delete("/:id", eliminarCarrito);
router.get("/:usuarioId/total", totalCarrito);
router.get("/:usuarioId", mostrarCarritoUsuario);

export default router;

import express from "express";
import {
  crearCategoria,
  listarCategorias,
  obtenerCategoria,
  actualizarCategoria,
  eliminarCategoria,
  statsCategorias
} from "../controllers/categoriaController.js";
import {validarToken, requiereAdmin} from "../middleware/jwt.js";

const router = express.Router();

router.post("/", validarToken, requiereAdmin, crearCategoria);
router.get("/", validarToken, requiereAdmin, listarCategorias);
router.get("/stats", validarToken, requiereAdmin, statsCategorias);
router.get("/:id", validarToken, requiereAdmin, obtenerCategoria);
router.put("/:id", validarToken, requiereAdmin, actualizarCategoria);
router.patch("/eliminar/:id", validarToken, requiereAdmin, eliminarCategoria);

export default router;

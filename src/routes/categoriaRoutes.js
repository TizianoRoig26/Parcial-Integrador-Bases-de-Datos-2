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

router.post("/", crearCategoria, validarToken, requiereAdmin);
router.get("/", listarCategorias, validarToken, requiereAdmin);
router.get("/stats", statsCategorias, validarToken, requiereAdmin);
router.get("/:id", obtenerCategoria, validarToken, requiereAdmin);
router.put("/:id", actualizarCategoria, validarToken, requiereAdmin);
router.patch("/eliminar/:id", eliminarCategoria, validarToken, requiereAdmin);

export default router;

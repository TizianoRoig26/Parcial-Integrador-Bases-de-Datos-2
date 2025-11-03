import express from "express";
import {
  crearCategoria,
  listarCategorias,
  obtenerCategoria,
  actualizarCategoria,
  eliminarCategoria,
  statsCategorias
} from "../controllers/categoriaController.js";

const router = express.Router();

router.post("/", crearCategoria);
router.get("/", listarCategorias);
router.get("/stats", statsCategorias);
router.get("/:id", obtenerCategoria);
router.put("/:id", actualizarCategoria);
router.delete("/:id", eliminarCategoria);

export default router;

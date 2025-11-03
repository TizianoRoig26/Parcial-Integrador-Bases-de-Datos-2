import express from "express";
import {
  crearResena,
  listarResenas,
  obtenerResena,
  actualizarResena,
  eliminarResena,
  resenasPorProducto,
  topResenas
} from "../controllers/resenaController.js";

const router = express.Router();

router.post("/", crearResena);
router.get("/", listarResenas);
router.get("/product/:productId", resenasPorProducto);
router.get("/top", topResenas);
router.get("/:id", obtenerResena);
router.put("/:id", actualizarResena);
router.delete("/:id", eliminarResena);

export default router;

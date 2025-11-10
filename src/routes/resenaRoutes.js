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
import {validarToken, requiereAdmin} from "../middleware/jwt.js";
const router = express.Router();

router.post("/", crearResena, validarToken);
router.get("/", listarResenas);
router.get("/producto/:productId", resenasPorProducto);
router.get("/top", topResenas);
router.get("/:id", obtenerResena);
router.put("/:id", actualizarResena, validarToken, requiereAdmin);
router.delete("/:id", eliminarResena, validarToken, requiereAdmin);

export default router;

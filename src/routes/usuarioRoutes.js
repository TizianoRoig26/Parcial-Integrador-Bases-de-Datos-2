import express from "express";
import {
  crearUsuario,
  listarUsuarios,
  obtenerUsuario,
  actualizarUsuario,
  eliminarUsuario
} from "../controllers/usuarioController.js";

const router = express.Router();

router.post("/", crearUsuario);
router.get("/", listarUsuarios);
router.get("/:id", obtenerUsuario);
router.put("/:id", actualizarUsuario);
router.delete("/:id", eliminarUsuario);

export default router;

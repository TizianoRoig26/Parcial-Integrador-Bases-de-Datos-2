import express from "express";
import {
  crearUsuario,
  listarUsuarios,
  obtenerUsuario,
  actualizarUsuario,
  eliminarUsuario,
  iniciarSesion
} from "../controllers/usuarioController.js";
import {validarToken, requiereAdmin} from "../middleware/jwt.js";

const router = express.Router();

router.post("/registrar", crearUsuario);
router.get("/", validarToken, requiereAdmin, listarUsuarios);
router.get("/:id", validarToken, requiereAdmin, obtenerUsuario);
router.put("/:id", validarToken, requiereAdmin, actualizarUsuario);
router.patch("/eliminar/:id", validarToken, requiereAdmin, eliminarUsuario);
router.post("/inicio-sesion/", iniciarSesion); 

export default router;

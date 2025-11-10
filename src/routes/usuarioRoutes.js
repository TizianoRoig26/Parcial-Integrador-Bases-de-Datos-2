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

router.post("/registrar/", crearUsuario);
router.get("/", listarUsuarios, validarToken, requiereAdmin);
router.get("/:id", obtenerUsuario, validarToken, requiereAdmin);
router.put("/:id", actualizarUsuario, validarToken, requiereAdmin);
router.patch("/eliminar/:id", eliminarUsuario, validarToken, requiereAdmin);
router.post("/inicio-sesion/", iniciarSesion); 

export default router;

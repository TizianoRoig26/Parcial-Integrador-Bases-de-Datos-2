import express from "express";
import {
  crearProducto,
  listarProductos,
  obtenerProducto,
  actualizarProducto,
  eliminarProducto,
  filtrarProductos,
  productosTop,
  actualizarStock
} from "../controllers/productoController.js";
import {requiereAdmin, validarToken} from "../middleware/jwt.js";

const router = express.Router();

router.get("/", listarProductos);           
router.post("/filtro", validarToken, requiereAdmin, filtrarProductos);     
router.get("/top", validarToken, requiereAdmin, productosTop);           
router.get("/:id", obtenerProducto);
router.patch("/:id/stock", validarToken, requiereAdmin, actualizarStock); 
router.put("/actualizar/:id", validarToken, requiereAdmin, actualizarProducto);
router.patch("/eliminar/:id", validarToken, requiereAdmin, eliminarProducto);
router.post("/", validarToken, requiereAdmin, crearProducto);

export default router;

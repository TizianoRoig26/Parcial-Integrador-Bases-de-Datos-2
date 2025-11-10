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
router.post("/filtro", filtrarProductos, validarToken, requiereAdmin);     
router.get("/top", productosTop, validarToken, requiereAdmin);           
router.get("/:id", obtenerProducto);
router.patch("/:id/stock", actualizarStock, validarToken, requiereAdmin); 
router.put("/actualizar/:id", actualizarProducto, validarToken, requiereAdmin);
router.patch("/eliminar/:id", eliminarProducto, validarToken, requiereAdmin);
router.post("/", crearProducto, validarToken, requiereAdmin);

export default router;

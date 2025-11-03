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
import { act } from "react";

const router = express.Router();

router.post("/", crearProducto);
router.get("/", listarProductos);            // listar con categoría
router.post("/filtro", filtrarProductos);     // filtro por precio/marca/categoria
router.get("/top", productosTop);           // top por promedio de reseñas
router.get("/:id", obtenerProducto);
router.patch("/:id/stock", actualizarStock); 
router.put("/:id", actualizarProducto);
router.delete("/:id", eliminarProducto);

export default router;

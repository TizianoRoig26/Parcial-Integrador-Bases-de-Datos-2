import express from "express";
import {
  obtenerProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto
} from "../controllers/productoController.js";

const router = express.Router();

// Rutas CRUD
router.get("/", obtenerProductos);           // GET /api/productos
router.get("/:id", obtenerProducto);        // GET /api/productos/:id
router.post("/", crearProducto);            // POST /api/productos
router.put("/:id", actualizarProducto);     // PUT /api/productos/:id
router.delete("/:id", eliminarProducto);    // DELETE /api/productos/:id

export default router;

import Orden from "../models/Pedidos.js";
import Producto from "../models/Producto.js";

// Crear pedido
export const crearOrden = async (req, res) => {
  try {
    const usuarioId = req.body.usuarioId;
    const productos = req.body.productos;
    // Creamos un array para guardar productos con su precio
    let productosConPrecio = [];
    for (let i = 0; i < productos.length; i++) {
      const p = productos[i];
      const prodDB = await Producto.findById(p.productoId);
      if (!prodDB) {
        return res.status(404).json({ mensaje: "Producto no encontrado: " + p.productoId });
      }
      productosConPrecio.push({
        producto: prodDB._id,
        cantidad: p.cantidad,
        precioUnitario: prodDB.precio
      });
    }
    // Calculamos el total
    let total = 0;
    for (let i = 0; i < productosConPrecio.length; i++) {
      total += productosConPrecio[i].cantidad * productosConPrecio[i].precioUnitario;
    }
    // Creamos la orden
    const nuevaOrden = new Orden({
      usuario: usuarioId,
      productos: productosConPrecio,
      total: total,
      estado: "PENDIENTE"
    });
    await nuevaOrden.save();
    res.json(nuevaOrden);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear orden", error: error.message });
  }
};
// Obtener todas las órdenes con datos de usuario
export const obtenerOrdenes = async (req, res) => {
  try {
    const ordenes = await Orden.find().populate("usuario", "nombre email");
    res.json(ordenes);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener órdenes", error });
  }
};

// Obtener pedidos de un usuario específico
export const obtenerOrdenesPorUsuario = async (req, res) => {
  try {
    const ordenes = await Orden.find({ usuario: req.params.userId }).populate("usuario", "nombre email");
    res.json(ordenes);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener órdenes de usuario", error });
  }
};

// Obtener stats: cantidad de pedidos por estado
export const obtenerStatsOrdenes = async (req, res) => {
  try {
    const stats = await Orden.aggregate([
      { $group: { _id: "$estado", totalPedidos: { $sum: 1 } } }
    ]);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener estadísticas", error });
  }
};

// Obtener una orden por ID
export const obtenerOrdenPorId = async (req, res) => {
  try {
    const orden = await Orden.findById(req.params.id).populate("usuario", "nombre email");
    if (!orden) return res.status(404).json({ mensaje: "Orden no encontrada" });
    res.json(orden);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener orden", error });
  }
};

// Actualizar orden
export const actualizarOrden = async (req, res) => {
  try {
    const orden = await Orden.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(orden);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar orden", error });
  }
};

// Actualizar estado
export const actualizarEstadoOrden = async (req, res) => {
  try {
    const orden = await Orden.findByIdAndUpdate(
      req.params.id,
      { estado: req.body.estado },
      { new: true }
    );
    res.json(orden);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar estado", error });
  }
};

// Eliminar orden
export const eliminarOrden = async (req, res) => {
  try {
    await Orden.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Orden eliminada" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar orden", error });
  }
};

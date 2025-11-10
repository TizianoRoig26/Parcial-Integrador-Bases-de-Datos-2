import Pedido from "../models/Pedido.js";
import Producto from "../models/Producto.js";

export const crearOrden = async (req, res, next) => {
  try {
    const { usuario, productos, metodoPago } = req.body;

    if (!usuario || !productos || productos.length === 0 || !metodoPago) {
      return res.status(400).json({ mensaje: "Faltan datos requeridos" });
    }

    let total = 0;
    const productosConPrecio = [];

    for (const p of productos) {
      const productoDB = await Producto.findById(p.producto);
      if (!productoDB) {
        throw new Error(`El producto con ID ${p.producto} no existe`);
      }

      const precioUnitario = productoDB.precio;
      const subtotal = precioUnitario * p.cantidad;
      total += subtotal;

      productosConPrecio.push({
        producto: productoDB._id,
        cantidad: p.cantidad,
        precioUnitario
      });
    }

    const nuevaOrden = await Pedido.create({
      usuario,
      productos: productosConPrecio,
      total,
      metodoPago
    });

    res.status(201).json({
      mensaje: "Pedido creado",
      orden: nuevaOrden
    });

  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear el pedido",
      error: error.message
    });
  }
};

// Obtener todas las órdenes con datos de usuario
export const obtenerOrdenes = async (req, res, next) => {
  try {
    const pedidos = await Pedido.find().populate("usuario", "nombre email");
    res.status(200).json(pedidos);
  } catch (error) {
    next(error);
  }
};

// Obtener pedidos de un usuario específico
export const obtenerOrdenesPorUsuario = async (req, res, next) => {
  try {
    const pedidos = await Pedido.find({ usuario: req.params.userId }).populate("usuario", "nombre email");
    res.json(pedidos);
  } catch (error) {
    next(error);
  }
};

export const obtenerStatsOrdenes = async (req, res, next) => {
  try {
    const stats = await Pedido.aggregate([
      { $group: { _id: "$estado", totalPedidos: { $sum: 1 } } }
    ]);
    res.status(200).json(stats);
  } catch (error) {
    next(error);
  }
};

// Obtener una orden por ID
export const obtenerOrdenPorId = async (req, res, next) => {
  try {
    const pedido = await Pedido.findById(req.params.id).populate("usuario", "nombre email");
    if (!pedido) return res.status(404).json({ mensaje: "pedido no encontrado" });
    res.status(200).json(pedido);
  } catch (error) {
    next(error);
  }
};

// Actualizar orden
export const actualizarOrden = async (req, res, next) => {
  try {
    const pedido = await Pedido.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(pedido);
  } catch (error) {
    next(error);
  }
};

// Actualizar estado
export const actualizarEstadoOrden = async (req, res, next) => {
  try {
    const pedido = await Pedido.findByIdAndUpdate(
      req.params.id,
      { estado: req.body.estado },
      { new: true }
    );
    res.status(200).json(pedido);
  } catch (error) {
    next(error);
  }
};

// Eliminar orden
export const eliminarOrden = async (req, res, next) => {
  try {
    const pedido = await Pedido.findByIdAndUpdate(
          req.params.id,
          { eliminado: true }, 
          { new: true } 
        );
    if (!pedido){
      return res.status(404).json({ mensaje: "Pedido no encontrado" });
    }
    res.status(200).json({ mensaje: "Pedido eliminado" });
  } catch (error) {
    next(error);
  }
};

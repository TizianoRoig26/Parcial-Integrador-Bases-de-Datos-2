import Pedido from "../models/Pedido.js";
import Producto from "../models/Producto.js";
import Usuario from "../models/Usuarios.js";
import Carrito from "../models/Carrito.js";

export const crearOrden = async (req, res) => {
  try {
    const { usuarioId, metodoPago } = req.body;

    const usuario = await Usuario.findById(usuarioId).populate("carrito");

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    if (!usuario.carrito) {
      return res.status(400).json({ mensaje: "El usuario no tiene un carrito asociado" });
    }

    const carrito = await Carrito.findOne({ usuarioId })
    .populate("productos.producto", "precio");

    if (!carrito) {
      return res.status(404).json({ mensaje: "Carrito no encontrado" });
    }

    if (!carrito.productos || carrito.productos.length === 0) {
      return res.status(400).json({ mensaje: "El carrito está vacío" });
    }

    const productosValidos = carrito.productos.filter(p => p.producto !== null);

    let total = 0;
    const productosConPrecio = productosValidos.map(p => {
      const subtotal = p.producto.precio * p.cantidad;
      total += subtotal;
      return {
        producto: p.producto._id,
        cantidad: p.cantidad,
        precioUnitario: p.producto.precio
      };
    });
    const nuevaOrden = await Pedido.create({
      usuario: usuario._id,
      productos: productosConPrecio,
      total,
      metodoPago
    });

    res.status(201).json({
      success: true,
      data: nuevaOrden 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear la orden", error: error.message });
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

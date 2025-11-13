import e from "express";
import Carrito from "../models/Carrito.js";

export const crearCarrito = async (req, res, next) => {
  try{
      const { usuarioId } = req.body;
    if (!usuarioId) {
      return res.status(400).json({
        success: false,
        message: "El campo usuarioId es obligatorio",
      });
    }
    const carritoExistente = await Carrito.findOne({ usuarioId });
    if (carritoExistente) {
      return res.status(400).json({
        success: false,
        message: "Ya existe un carrito para este usuario",
      });
    }
    const carrito = await Carrito.create(req.body);
    res.status(201).json({
      success: true,
      data: carrito,
    });
  } catch (err) {
    next(err);
  }
};

export const listarCarritos = async (req, res, next) => {
  try {
    const carritos = await Carrito.find({ eliminado: false })
      .populate("usuarioId", "nombre email")
      .populate("productos.producto", "nombre precio marca");

    if (!carritos.length) {
      return res.status(404).json({ mensaje: "No se encontraron carritos" });
    }

    res.status(200).json({ 
      success: true,
      data: carritos 
    });
  } catch (err) {
    next(err);
  }
};

export const obtenerCarrito = async (req, res, next) => {
  try {
    const carrito = await Carrito.findById(req.params.id)
    .populate("productos.producto", "nombre precio marca");

    if (!carrito || carrito.eliminado) {
      return res.status(404).json({ mensaje: "No se encontro carrito" });
    }

    res.status(200).json({ 
      success: true,
      data: carrito
    });
  } catch (err) {
    next(err);
  }
};

export const actualizarCarrito = async (req, res, next) => {
  try {
    const carrito = await Carrito.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!carrito) {
      return res.status(404).json({ mensaje: "Carrito no encontrado" });
    }
    res.json(carrito);
  } catch (error) {
    next(error);
  }
};

export const eliminarCarrito = async (req, res, next) => {
  try {
    const carrito = await Carrito.findByIdAndUpdate(
      req.params.id,
      { eliminado: true },
      { new: true }
    );
    if (!carrito) {
      return res.status(404).json({ mensaje: "Carrito no encontrado" });
    }
    res.json({ mensaje: "Carrito eliminado" });
  } catch (error) {
    next(error);
  }
};

export const mostrarCarritoUsuario = async (req, res, next) => {
  try {
    const carrito = await Carrito.findOne({ usuarioId: req.params.usuarioId })
      .populate("productos.producto");

    res.status(200).json({
      success: true,
      data: carrito
    });
  } catch (error) {
    next(error);
  }
};

export const totalCarrito = async (req, res, next) => {
  try {
    const carrito = await Carrito.findOne({ usuarioId: req.params.usuarioId })
      .populate({
        path: "productos.producto",
        match: { eliminado: { $ne: true } }, 
        select: "precio"
      })

    if (!carrito)
      return res.status(404).json({ mensaje: "Carrito no encontrado" });

     // productos que existen 
    const productosValidos = carrito.productos.filter(p => p.producto && p.producto.precio);

    let subtotal = 0;

    for (const p of productosValidos) {
      subtotal += p.producto.precio * p.cantidad;
    }

    res.json({ subtotal, total: subtotal });
  } catch (error) {
    next(error);
  }
};

export const agregarProductosAlCarrito = async (req, res, next) => {
  try {
    const { productos } = req.body; 
    const usuarioId = req.usuario._id || req.usuario.id;

    if (!usuarioId) {
      return res.status(401).json({ mensaje: "Usuario no autenticado" });
    }

    if (!productos || !Array.isArray(productos) || productos.length === 0) {
      return res.status(400).json({ mensaje: "Debe enviar al menos un producto válido" });
    }

    let carrito = await Carrito.findOne({ usuarioId });

    // creo el carrito si no existe 
    if (!carrito) {
      carrito = new Carrito({
        usuarioId,
        productos: productos.map(p => ({
          producto: p.productoId,
          cantidad: p.cantidad || 1
        }))
      });
    } else {
      // recorremos los productos recibidos
      for (const p of productos) {
        const productoExistente = carrito.productos.find(
          (item) => item.producto.toString() === p.productoId
        );

        if (productoExistente) {
          productoExistente.cantidad += p.cantidad || 1;
        } else {
          carrito.productos.push({
            producto: p.productoId,
            cantidad: p.cantidad || 1
          });
        }
      }
    }

    await carrito.save();
    res.status(200).json({
      mensaje: "Productos agregados al carrito correctamente",
      carrito
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const eliminarCarritoU = async (carritoId) => {
  try {
    if (!carritoId) return null;
    return await Carrito.findByIdAndUpdate(
      carritoId,
      { eliminado: true },
      { new: true }
    );
  } catch (error) {
    throw new Error("Error al eliminar carrito");
  }
};

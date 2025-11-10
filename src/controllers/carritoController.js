import e from "express";
import Carrito from "../models/Carrito.js";

export const crearCarrito = async (req, res, next) => {
  try {
    const carrito = await Carrito.create(req.body);
    res.status(201).json({ 
      success: true, 
      data: carrito });
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
      .populate("productos.producto", "precio");

    if (!carrito)
      return res.status(404).json({ mensaje: "Carrito no encontrado" });

    const subtotal = carrito.productos.reduce(
      (acc, p) => acc + p.producto.precio * p.cantidad,
      0
    );

    res.json({ subtotal, total: subtotal });
  } catch (error) {
    next(error);
  }
};

export const agregarProductosAlCarrito = async (req, res) => {
  try {
    const { productoId, cantidad } = req.body;
    const usuarioId = req.usuario._id || req.usuario.id;

    if (!usuarioId) {
      return res.status(401).json({ mensaje: "Usuario no autenticado" });
    }

    if (!productoId) {
      return res.status(400).json({ mensaje: "El ID del producto es obligatorio" });
    }

    let carrito = await Carrito.findOne({ usuarioId });

    if (!carrito) {
      carrito = new Carrito({
        usuarioId, 
        productos: [{ producto: productoId, cantidad }]
      });
    } else {
      const productoExistente = carrito.productos.find(
        (p) => p.producto.toString() === productoId
      );

      if (productoExistente) {
        productoExistente.cantidad += cantidad || 1;
      } else {
        carrito.productos.push({ producto: productoId, cantidad });
      }
    }

    await carrito.save();
    res.status(200).json(carrito);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al agregar producto al carrito" });
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

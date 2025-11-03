import Carrito from "../models/Carrito.js";
import Producto from "../models/Producto.js";

export const crearCarrito = async (req, res) => {
  const carrito = await Carrito.create(req.body);
  res.status(201).json(carrito);
};

export const listarCarritos = async (req, res) => {
  const carritos = await Carrito.find().populate("usuarioId productos.productoId");
  res.json(carritos);
};

export const obtenerCarrito = async (req, res) => {
  const carrito = await Carrito.findById(req.params.id).populate("productos.productoId");
  res.json(carrito);
};

export const actualizarCarrito = async (req, res) => {
  const carrito = await Carrito.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(carrito);
};

export const eliminarCarrito = async (req, res) => {
  await Carrito.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Carrito eliminado" });
};

export const mostrarCarritoUsuario = async (req, res) => {
  const carrito = await Carrito.findOne({ usuarioId: req.params.usuarioId })
    .populate("productos.productoId");
  res.json(carrito);
};

export const totalCarrito = async (req, res) => {
  const carrito = await Carrito.findOne({ usuarioId: req.params.usuarioId }).populate("productos.productoId");
  if (!carrito) return res.status(404).json({ mensaje: "Carrito no encontrado" });

  const subtotal = carrito.productos.reduce((acc, p) => acc + p.productoId.precio * p.cantidad, 0);
  res.json({ subtotal, total: subtotal });
};

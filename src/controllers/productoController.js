import Producto from "../models/Producto.js";
import Resena from "../models/Resena.js";

// CRUD básico
export const crearProducto = async (req, res) => {
  try {
    const producto = await Producto.create(req.body);
    res.status(201).json(producto);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear producto", error });
  }
};

export const listarProductos = async (req, res) => {
  const productos = await Producto.find().populate("categoria");
  res.json(productos);
};

export const obtenerProducto = async (req, res) => {
  const producto = await Producto.findById(req.params.id).populate("categoria");
  if (!producto) return res.status(404).json({ mensaje: "Producto no encontrado" });
  res.json(producto);
};

export const actualizarProducto = async (req, res) => {
  const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(producto);
};

export const eliminarProducto = async (req, res) => {
  await Producto.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Producto eliminado" });
};

// Filtro por rango de precio y marca
export const filtrarProductos = async (req, res) => {
  const { min, max, marca } = req.query;
  const filtro = {};
  if (min || max) filtro.precio = {};
  if (min) filtro.precio.$gte = Number(min);
  if (max) filtro.precio.$lte = Number(max);
  if (marca) filtro.marca = marca;

  const productos = await Producto.find(filtro).populate("categoria");
  res.json(productos);
};

// Top productos (promedio de reseñas)
export const productosTop = async (req, res) => {
  const top = await Resena.aggregate([
    { $group: { _id: "$productoId", promedio: { $avg: "$calificacion" }, total: { $sum: 1 } } },
    { $sort: { promedio: -1 } }
  ]);
  res.json(top);
};

export const actualizarStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;

    if (stock == null) {
      return res.status(400).json({ mensaje: "Debes enviar el stock" });
    }

    const producto = await Producto.findByIdAndUpdate(
      id,
      { stock },
      { new: true }
    );

    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    res.json({ mensaje: "Stock actualizado", producto });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar stock", error: error.message });
  }
};
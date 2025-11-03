import Categoria from "../models/Categoria.js";
import Producto from "../models/Producto.js";

export const crearCategoria = async (req, res) => {
  try {
    const categoria = await Categoria.create(req.body);
    res.status(201).json(categoria);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear categoría", error });
  }
};

export const listarCategorias = async (req, res) => {
  const categorias = await Categoria.find();
  res.json(categorias);
};

export const obtenerCategoria = async (req, res) => {
  const categoria = await Categoria.findById(req.params.id);
  if (!categoria) return res.status(404).json({ mensaje: "No encontrada" });
  res.json(categoria);
};

export const actualizarCategoria = async (req, res) => {
  const categoria = await Categoria.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(categoria);
};

export const eliminarCategoria = async (req, res) => {
  await Categoria.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Categoría eliminada" });
};

export const statsCategorias = async (req, res) => {
  const stats = await Producto.aggregate([
    { $group: { _id: "$categoria", cantidad: { $sum: 1 } } }
  ]);
  res.json(stats);
};
    
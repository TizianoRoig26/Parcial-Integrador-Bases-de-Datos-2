import Resena from "../models/Resena.js";
import Orden from "../models/Pedidos.js";

export const crearResena = async (req, res) => {
  try {
    const { usuarioId, productoId, calificacion, comentario } = req.body;

    const nuevaResena = await Resena.create({
      usuarioId,
      productoId,
      calificacion,
      comentario
    });

    res.status(201).json(nuevaResena);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear reseña", error });
  }
};

export const listarResenas = async (req, res) => {
  const resenas = await Resena.find().populate("usuarioId productoId");
  res.json(resenas);
};

export const obtenerResena = async (req, res) => {
  const resena = await Resena.findById(req.params.id);
  res.json(resena);
};

export const actualizarResena = async (req, res) => {
  const resena = await Resena.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(resena);
};

export const eliminarResena = async (req, res) => {
  await Resena.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Reseña eliminada" });
};

export const resenasPorProducto = async (req, res) => {
  const resenas = await Resena.find({ productoId: req.params.productId }).populate("usuarioId");
  res.json(resenas);
};

export const topResenas = async (req, res) => {
  const top = await Resena.aggregate([
    { $group: { _id: "$productoId", promedio: { $avg: "$calificacion" }, total: { $sum: 1 } } },
    { $sort: { promedio: -1 } }
  ]);
  res.json(top);
};

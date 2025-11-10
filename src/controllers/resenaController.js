import Resena from "../models/Resena.js";

export const crearResena = async (req, res, next) => {
  try {
    const { usuarioId, productoId, calificacion, comentario } = req.body;
    if(!usuarioId || !productoId || !calificacion || !comentario) {
      return res.status(400).json({ mensaje: "Faltan datos obligatorios"});
    }
    const nuevaResena = await Resena.create({
      usuarioId,
      productoId,
      calificacion,
      comentario
    });
    res.json({ success: true, data: nuevaResena });
  }catch(err){
    next(err);
  }
};

export const listarResenas = async (req, res, next) => {
  try{
    const resenas = await Resena.find({eliminado: false});
    res.json({ success: true, data: resenas });
  }catch(err){
    next(err);
  }
};

export const obtenerResena = async (req, res, next) => {
  try{
    const resena = await Resena.findById(req.params.id);
    if(!resena || resena.eliminado) {
    return res.status(404).json({ mensaje: "No se encontro la resena" });
    }
    res.json({success: true, mensaje:resena});
  }
  catch(err){
    next(err);
  }
  
};

export const actualizarResena = async (req, res, next) => {
  try{
  let resena = await Resena.findById(req.params.id);
  if(!resena || resena.eliminado) {
    return res.status(404).json({ mensaje: "No se encontraron resenas para el producto" });
  }
  resena = await Resena.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({success: true, mensaje: resena});
  }
  catch(err){
  next(err);
  }
};

export const eliminarResena = async (req, res, next) => {
  try{
    await Resena.findByIdAndUpdate(req.params.id, 
      { eliminado: true },
      { new: true });
    res.json({success: true, mensaje: "Resena eliminada"});
  }catch(err){
    next(err);
  }
};

export const resenasPorProducto = async (req, res, next) => {
  try{
  const resenas = await Resena.find({ productoId: req.params.productId }).populate("usuarioId");
  if(!resenas || resenas.eliminado) {
    return res.status(404).json({ mensaje: "No se encontraron resenas para el producto" });
  }
  res.json(resenas);
  }catch(err){
    next(err);
  }
};

export const topResenas = async (req, res, next) => {
  try{ 
    const top = await Resena.aggregate([
    {
      $group: {
        _id: "$productoId",
        promedioCalificacion: { $avg: "$calificacion" },
        cantidadResenas: { $sum: 1 }
      }
    },
    { $sort: { promedioCalificacion: -1 } },
    {
      $lookup: {
        from: "productos",
        localField: "_id",
        foreignField: "_id",
        as: "producto"
      }
    },
    { $unwind: "$producto" },
    {
      $project: {
        _id: 0,
        productoId: "$_id",
        nombre: "$producto.nombre",
        marca: "$producto.marca",
        precio: "$producto.precio",
        promedioCalificacion: 1,
        cantidadResenas: 1
      }
    }
    ]);
    res.json({ success: true, data: top });
  }catch(err){
    next(err);
  }
};

import Categoria from "../models/Categoria.js";
import Producto from "../models/Producto.js";

export const crearCategoria = async (req, res, next) => {
  try {
    const categoria = await Categoria.create(req.body);
    if(!categoria.nombre){
      return res.status(400).json({ mensaje: "Faltan datos requeridos" });
    }
    res.status(200).json({
      success: true,
      data: categoria
    });
  } catch (error) {
    next(error);
  }
};

export const listarCategorias = async (req, res, next) => {
  try{
    const categorias = await Categoria.find({ eliminado: false }).populate({
      path: "productos",
      match: { eliminado: { $ne: true } }, 
      select: "nombre precio"
    });
    res.status(200).json({
      success: true,
      data: categorias
    });
  }catch(error){
    next(error);
  }

};

export const obtenerCategoria = async (req, res, next) => {
  try{
    const categoria = await Categoria.findById(req.params.id).populate({
      path: "productos",
      match: { eliminado: { $ne: true } }, 
      select: "nombre precio"
    });
    if (!categoria || categoria.eliminado) {
      return res.status(404).json({
      success: false,
      data: "Error al obtener la categoria"
    });
    }
    res.status(200).json({
      success: true,
      data: categoria
    });
  }catch(error){
    next(error);
  }
};

export const actualizarCategoria = async (req, res, next) => {
  try{
    const categoria = await Categoria.findById(req.params.id);
    if (!categoria || categoria.eliminado) {
      return res.status(404).json({
      success: false,
      data: "Error al obtener las categorias"
    });
    }
    categoria.set(req.body);
    await categoria.save();
    res.status(200).json({
      success: true,
      data: categoria
    });
  }catch(error){
    next(error);
  }
};

export const eliminarCategoria = async (req, res, next) => {
  try{
    await Categoria.findByIdAndUpdate(req.params.id, 
      { eliminado: true },
      { new: true }
    );
    res.status(200).json({
      success: true
    });
  }catch(error){
    next(error);
  }

};

export const statsCategorias = async (req, res, next) => {
  try {
      const stats = await Producto.aggregate([
      { 
        $match: { 
          eliminado: { $ne: true } 
        } 
      },
      {
        $group: {
          _id: "$categoria",
          cantidad: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: "categorias",
          localField: "_id",
          foreignField: "_id",
          as: "categoriaInfo"
        }
      },
      { $unwind: "$categoriaInfo" },
      {
        $project: {
          _id: 0,
          categoria: "$categoriaInfo.nombre",
          cantidad: 1
        }
      }
    ]);
      res.status(200).json({
      success: true,
      data: stats
    });
  }catch (error) {
    next(error);
  }
};
    
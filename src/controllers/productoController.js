import Producto from "../models/Producto.js";
import Resena from "../models/Resena.js";
import Categoria from "../models/Categoria.js";

export const crearProducto = async (req, res, next) => {
  try {
    const producto = await Producto.create(req.body);
    if (req.body.categoria) {
      const categoria = await Categoria.findById(req.body.categoria);
      if (categoria) {
        if (!categoria.productos.includes(producto._id)) {
          categoria.productos.push(producto._id);
          await categoria.save();
        }
      }
    }
    res.status(201).json({
      success: true,
      producto: producto
    });
  } catch (error) {                                                                            
    next(error);
  }
};

export const listarProductos = async (req, res, next) => {
  try {
    const productos = await Producto.find({ eliminado: false });
    res.status(200).json(productos);
  } catch (error) {
    next(error);
  }
};

export const obtenerProducto = async (req, res, next) => {
  try{
      const producto = await Producto.findById(req.params.id);
  if (!producto) {
    res.status(404).json({ mensaje: "Producto no encontrado" })
  };
   res.status(200).json(producto);
  }catch(err){
    next(err);
  }
};  

export const actualizarProducto = async (req, res, next) => {
  try {
    const { id } = req.params;
    const datosActualizados = req.body;
    const productoActualizado = await Producto.findByIdAndUpdate(
      id,
      datosActualizados,
      {
        new: true,          // Devuelve el producto modificado
        runValidators: true // Aplica validaciones del schema
      }
    );
    if (!productoActualizado) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }
    res.status(200).json(productoActualizado);
  } catch (error) {
    next(error);
  }
};

export const eliminarProducto = async (req, res, next) => {
try {
    const producto = await Producto.findByIdAndUpdate(
      req.params.id,
      { eliminado: true }, 
      { new: true } 
    );
    if (!producto) {
      return res.status(404).json({ mensaje: "producto no encontrado" });
    }
    res.json({ mensaje: "producto eliminado", eliminado: producto.eliminado});
  } catch (err) {
    next(err);
  }
};

export const filtrarProductos = async (req, res, next) => {
  try {
    const { min, max, marca } = req.body;
    const filtro = {};
    if (min || max) {
      filtro.precio = {};
      if (min) filtro.precio.$gte = Number(min);
      if (max) filtro.precio.$lte = Number(max);
    }
    if (marca) filtro.marca = marca;
    filtro.eliminado = false;
  
    const productos = await Producto.find(filtro).populate("categoria", "nombre");
    res.json(productos);
  } catch (error) {
   next(error);
  }
};

export const productosTop = async (req, res, next) => {
  try{
    const top = await Resena.aggregate([
      {
        $group: {
          _id: "$productoId",
          promedio: { $avg: "$calificacion" },
          total: { $sum: 1 }
        }
      },
      { $sort: { promedio: -1 } },

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
          precio: "$producto.precio",
          marca: "$producto.marca",
          promedio: 1,
          total: 1
        }
      }
    ]);
    res.status(200).json(top);
  }catch(err){
      next(err);
  }
};

export const actualizarStock = async (req, res, next) => {
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
  } catch (err) {
    next(err);
  }
};
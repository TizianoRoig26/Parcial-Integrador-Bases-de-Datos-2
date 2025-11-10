import Usuario from "../models/Usuarios.js";
import Carrito from "../models/Carrito.js";
import { eliminarCarritoU } from "./carritoController.js";
import { encriptar, comparar } from "../middleware/aut.js";
import { generarToken } from "../middleware/jwt.js";


export const crearUsuario = async (req, res, next) => {
  try {
    const {nombre, email, direccion, telefono, contrasenia} = req.body;
    if (!nombre || !email || !contrasenia || !direccion || !telefono) {
      return res.status(400).json({ mensaje: "Faltan datos obligatorios"});
    }
    const verificarMail = await Usuario.findOne({email});
    if (verificarMail) {
      return res.status(400).json({message: "El email ya está registrado"});
    }
    const usuario = await Usuario.create(req.body);

    const contraseniaEncriptada = await encriptar(contrasenia);
    usuario.contrasenia = contraseniaEncriptada;
    const carrito = await Carrito.create({ usuarioId: usuario._id }); 
    usuario.carrito = carrito._id;//carrito personal
    await usuario.save();
    const token = generarToken(usuario);
    res.status(201).json({
      success: true,
      data: usuario,
      token
    });
  } catch (err) {
     next(err);
  }
};

export const listarUsuarios = async (req, res, next) => {
  try{
    const usuarios = await Usuario.find({ eliminado: false });
    if (!usuarios.length) {
      return res.status(204).json({ mensaje: "No se encontraron usuarios" });
    }
    res.json({ success: true, data: usuarios });
  }catch{
    next(err);
  }
};

export const obtenerUsuario = async (req, res, next) => {
  try{
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario || usuario.eliminado) {
      return res.status(400).json({ mensaje: "No se encontro el usuario" });
    }
    res.json({ success: true, data: usuario });
  }catch{
    next(err);
  }
};

export const actualizarUsuario = async (req, res, next) => {
  try {
    const {nombre, email, direccion, telefono} = req.body;
    const id = req.params.id;
    const usuario = await Usuario.findById(id);
    if (!usuario || usuario.eliminado) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      id,
      { nombre, email, direccion, telefono },
      { new: true }
    );
    if(!usuarioActualizado) {
      return res.status(404).json({ mensaje: "Error al actualizar usuario" });
    }
    res.json({ success: true, data: usuarioActualizado });
  } catch (err) {
    next(err);
  }
  };

export const eliminarUsuario = async (req, res, next) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      { eliminado: true }, 
      { new: true } 
    );
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
    if (usuario.carrito) {
      await eliminarCarritoU(usuario.carrito);
    }
    res.status(200).json({ mensaje: "Usuario eliminado"});
  } catch (err) {
    next(err);
  }
};

export const iniciarSesion = async (req, res, next) => {
  try {
    const { email, contrasenia } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (!usuario || usuario.eliminado) {
      return res.status(400).json({ mensaje: "No se encontró al usuario" });
    }
    const esContraseniaValida = await comparar(contrasenia, usuario.contrasenia);
    if (!esContraseniaValida) {
      return res.status(400).json({ mensaje: "Credenciales inválidas" });
    } 
    const token = generarToken(usuario);
    res.json({ mensaje: "Inicio de sesión exitoso", usuario, token });
  } catch (err) {
    next(err);
  }
};
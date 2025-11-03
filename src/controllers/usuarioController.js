import Usuario from "../models/Usuarios.js";

// Crear
export const crearUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear usuario", error });
  }
};

// Listar
export const listarUsuarios = async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
};

// Obtener uno
export const obtenerUsuario = async (req, res) => {
  const usuario = await Usuario.findById(req.params.id);
  if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });
  res.json(usuario);
};

// Actualizar
export const actualizarUsuario = async (req, res) => {
  const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(usuario);
};

// Eliminar
export const eliminarUsuario = async (req, res) => {
  await Usuario.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Usuario eliminado" });
};


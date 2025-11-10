import jwt from 'jsonwebtoken';

const clave = process.env.JWT_SECRET || "clave-por-defecto";

// Generar token
export const generarToken = (usuario) => {
  return jwt.sign(
    { id: usuario._id, rol: usuario.rol },
    clave,
    { expiresIn: "1h" }
  );
}; 

// Validar token
export const validarToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  // Espera: "Bearer token"
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ mensaje: "El token es obligatorio" });
  }

  jwt.verify(token, clave, (error, decodificado) => {
    if (error) {
      return res.status(403).json({ mensaje: "El token no es válido o expiró" });
    }

    // Guarda los datos del usuario dentro del request
    req.usuario = decodificado;
    next();
  });
};

// Middleware: Solo administradores
export const requiereAdmin = (req, res, next) => {
  if (!req.usuario) {
    return res.status(401).json({ mensaje: "No se encontró información del usuario" });
  }
  if (req.usuario.rol !== "ADMIN") {
    return res.status(403).json({ mensaje: "Acceso denegado: se requiere rol de administrador" });
  }
  next();
};

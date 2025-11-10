import bcrypt from 'bcryptjs';

export const encriptar = async (contrasenia) => {
  return await bcrypt.hash(contrasenia, 10);
}

export const comparar = async (contrasenia, encriptada) => {
  return await bcrypt.compare(contrasenia, encriptada);
}
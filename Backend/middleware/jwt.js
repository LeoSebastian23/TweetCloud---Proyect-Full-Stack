
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// Función para generar el token
export const generarToken = (userId) => {
  const payload = { userId };
  const secret = process.env.JWT_SECRET; // Asegúrate de que se está usando el secreto del archivo .env
  const options = { expiresIn: '1h' }; // El token expirará en 1 hora

  return jwt.sign(payload, secret, options);
};

// Función para verificar un token en un middleware
export const verificarToken = (token) => {
  try {
    const secret = process.env.JWT_SECRET;
    //console.log('Verificando token con clave secreta:', secret);

    // Verificar el token y devolver los datos decodificados
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error('Token inválido o expirado'); // Lanzar un error manejable
  }
};

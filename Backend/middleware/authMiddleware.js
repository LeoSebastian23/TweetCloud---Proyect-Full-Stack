
import { verificarToken } from "./jwt.js";

export const authMiddleware = (req, res, next) => {
  // Extraer el token de la cabecera Authorization
  const token = req.headers['authorization']?.split(' ')[1]; // 'Bearer token'

  //console.log('Token recibido:', token);

  if (!token) {
    return res.status(401).json({ error: 'No se proporcionó un token' });
  }

  try {
    // Verificar el token usando la función verificarToken
    const decoded = verificarToken(token); // Decodifica el token directamente
    req.user = decoded; // Almacenar el usuario decodificado en `req.user`
    next(); // Continuar con el siguiente middleware/controlador
  } catch (error) {
    // Proporcionar un mensaje de error más específico
    return res.status(403).json({ error: error.message || 'Token inválido o expirado' });
  }
};


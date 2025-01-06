import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  //console.log("Token en backend:", token);  // Verifica que el token esté presente

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);  // Asegúrate de que la clave secreta sea correcta
    //console.log("Decoded Token:", decoded);  // Verifica que el token se decodifique correctamente
    req.user = decoded;  // Establece el usuario decodificado en `req.user`
    next();
  } catch (error) {
    console.error("Error al verificar el token:", error);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};


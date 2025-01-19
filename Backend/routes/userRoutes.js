import express from 'express';
import {
  crearUsuario,
  loginUsuario,
  obtenerUsuarios,
  actualizarUsuario,
  eliminarUsuario,
  getUserProfile,
} from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Rutas públicas
router.post('/register', crearUsuario); // Registrar usuario
router.post('/login', loginUsuario); // Login de usuario

// Rutas protegidas 
router.get('/', authMiddleware, obtenerUsuarios); // Obtener todos los usuarios (solo admin o autorizado)
router.get('/profile', authMiddleware, getUserProfile); // Obtener el perfil del usuario autenticado
router.put('/:id', authMiddleware, actualizarUsuario); // Actualizar un usuario por ID
router.delete('/:id', authMiddleware, eliminarUsuario); // Eliminar un usuario por ID

export { router as userRouter };

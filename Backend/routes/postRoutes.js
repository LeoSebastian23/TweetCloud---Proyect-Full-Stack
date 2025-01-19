import express from 'express';
import { 
  crearPublicacion, 
  obtenerPublicaciones, 
  obtenerPublicacionPorId, 
  editarPublicacion, 
  eliminarPublicacion, 
  eliminarPublicaciones 
} from '../controllers/postController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Rutas públicas o protegidas
router.get('/', obtenerPublicaciones); // Obtener todas las publicaciones
router.get('/:id', obtenerPublicacionPorId); // Obtener una publicación por ID

// Rutas protegidas 
router.post('/', authMiddleware, crearPublicacion); // Crear publicación
router.put('/:id', authMiddleware, editarPublicacion); // Editar publicación por ID
router.delete('/:id', authMiddleware, eliminarPublicacion); // Eliminar publicación por ID
router.delete('/', authMiddleware, eliminarPublicaciones); // Eliminar todas las publicaciones

export { router as postRouter };


import express from 'express';
import { crearPublicacion, obtenerPublicaciones, obtenerPublicacionPorId, editarPublicacion, eliminarPublicacion } from '../controllers/postController.js';
import { verificarToken } from '../middleware/auth.js';
const router = express.Router();

router.post('/', verificarToken, crearPublicacion);
router.get('/', obtenerPublicaciones);
router.get('/:id', obtenerPublicacionPorId);
router.put('/:id', editarPublicacion);
router.delete('/:id', eliminarPublicacion);

export {router as postRouter}; 

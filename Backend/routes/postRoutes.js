import express from 'express';
import { crearPublicacion, obtenerPublicaciones, obtenerPublicacionPorId, editarPublicacion, eliminarPublicacion } from '../controllers/postController.js';

const router = express.Router();

router.post('/', crearPublicacion);
router.get('/', obtenerPublicaciones);
router.get('/:id', obtenerPublicacionPorId);
router.put('/:id', editarPublicacion);
router.delete('/:id', eliminarPublicacion);

export {router as postRouter}; 

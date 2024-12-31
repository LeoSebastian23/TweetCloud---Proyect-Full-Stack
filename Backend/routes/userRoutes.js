import express from 'express';
import {
  crearUsuario,
  loginUsuario,
  obtenerUsuarios,
  actualizarUsuario,
  eliminarUsuario,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/register', crearUsuario);
router.post('/login', loginUsuario);
router.get('/', obtenerUsuarios); 
router.put('/:id', actualizarUsuario); 
router.delete('/:id', eliminarUsuario); 

export default router;

export {router as userRouter}; 
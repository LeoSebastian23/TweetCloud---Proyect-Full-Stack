import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import { userRouter } from './routes/UserRoutes.js';
import { postRouter } from './routes/postRoutes.js';
import crypto from 'crypto'

dotenv.config(); // Carga las variables de entorno
connectDB();     // Conecta a MongoDB

const app = express();

app.use(express.json()); // Para parsear JSON en el cuerpo de las solicitudes
app.use(cors());

// Rutas
app.use('/user', userRouter);
app.use('/post', postRouter);

app.get('/', (req, res) => {
  res.send('API corriendo...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

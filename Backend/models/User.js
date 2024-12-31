import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  imagenPerfil: { type: String, default: 'default-profile.png' }, 
}, { timestamps: true });

export default mongoose.model('User', userSchema);
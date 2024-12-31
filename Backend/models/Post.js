import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  cuerpo: { type: String, required: true, maxlength: 280 },
  autor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Relación con Usuario
}, { timestamps: true });

export default mongoose.model('Post', postSchema);

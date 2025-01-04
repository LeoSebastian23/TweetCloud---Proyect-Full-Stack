import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  imageProfile: { type: String, default: 'default-profile.png' }, 
}, { timestamps: true });

export default mongoose.model('User', userSchema);
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true,unique: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/},
  password: { type: String, required: true, minlength: 6 }, 
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
}, { timestamps: true });

// password hashing
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default mongoose.model('User', userSchema);
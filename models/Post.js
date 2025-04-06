import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  image: { type: String },
  categories: { type: [String], default: [] },
}, { timestamps: true });

export default mongoose.model('Post', postSchema);
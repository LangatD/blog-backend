import express from 'express';
import protect from '../authMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

//logged-in user's profile
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Exclude password from response
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
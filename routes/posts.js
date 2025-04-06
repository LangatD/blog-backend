import express from 'express';
import Post from '../models/Post.js';
import { protect } from '../authMiddleware.js';
const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'username');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/search', async (req, res) => {
  try {
    const query = req.query.q; 
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    // Search 
    const posts = await Post.find({
      $or: [
        { title: { $regex: query, $options: 'i' } }, 
        { content: { $regex: query, $options: 'i' } }, 
      ],
    });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Like a post
router.post('/:id/like', protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (!post.likes) {
      post.likes = [];
    }

    const userId = req.user._id; 

    if (post.likes.includes(userId)) {
      return res.status(400).json({ message: 'Post already liked' });
    }

    post.likes.push(userId);
    await post.save();
    res.status(200).json({ message: 'Post liked', likesCount: post.likes.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// new post
router.post('/', protect, async (req, res) => {
  try {
      const { title, content, image } = req.body;

      if (!req.user) {
          return res.status(401).json({ error: 'Unauthorized' });
      }

      const post = new Post({
          title,
          content,
          image, 
          author: req.user._id,
      });

      await post.save();
      await post.populate('author', 'username');
      res.status(201).json(post);
  } catch (err) {
      res.status(500).json({ error: 'Server error' });
  }
});

export default router;
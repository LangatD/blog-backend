import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Post from './models/Post.js';
import User from './models/User.js';
import blogPosts from './blogposts.json' assert { type: 'json' };

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Connection failed:', err));

const seedDatabase = async () => {
  try {
    await Post.deleteMany(); // Clear existing posts
    console.log('Existing blogs removed.');

    let user = await User.findOne({ username: 'healthguru' });

    if (!user) {
      console.log('User "healthguru" not found. Creating a new user...');
      user = new User({
        username: 'healthguru',
        email: 'healthguru@example.com',
        password: 'securepassword' // You should hash this in a real scenario
      });
      await user.save();
      console.log('User "healthguru" created.');
    }

    const postsWithAuthorIds = blogPosts.map(post => ({
      ...post,
      author: user._id, // Use valid ObjectId
    }));

    await Post.insertMany(postsWithAuthorIds);
    console.log('Database seeded successfully.');
    mongoose.connection.close();
  } catch (error) {
    console.error('Seeding failed:', error);
    mongoose.connection.close();
  }
};

seedDatabase();

const express = require('express');
const cors = require('cors');
const path = require('path');
const authroutes = require('./routes/auth')
const Post = require('./schemas/posts'); // your Mongoose Post model
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

const app = express();

app.use(cookieParser());  // cookie parser middleware



// this should be called after cookie parser has been called by app.use
const authenticateUser = require('./routes/middleware')

app.use(express.json());

const uri = process.env.MONGO_URI;

mongoose.connect(uri)
 .then(response => console.log("connected"))
 .catch(e => console.log("not connected", e))


app.use(cors());

app.get('/api/me', authenticateUser, async (req, res) => {
  const user = req.user; // set in middleware
  res.json({ name: user.name });
});


// to use in production 
if (process.env.NODE_ENV == "production"){
app.use(express.static(path.join(__dirname,'..','client', 'dist')));
}

// to use in development
else {
app.use(cors({
  origin: 'http://localhost:5173', // allow React dev server
  credentials: true,               // allow cookies
}));
}


// Route to fetch posts from the last 2 days
app.get('/api/recent-posts', async (req, res) => {
  try {
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000); // 2 days in ms

    const recentPosts = await Post.find({ createdAt: { $gte: twoDaysAgo } }).sort({ createdAt: -1 }); // gte means >=, 2 days ago or later and sort on basis of created at in descending order

    res.json(recentPosts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch recent posts' });
  }
});

// Route to get the most supported posts

app.get('/api/popular-posts', async (req, res) => {
  try {
    const threshold = parseInt(req.query.min || process.env.POPULAR_THRESHOLD || 1);
    // Select only needed fields
    const posts = await Post.find({ supportcount: { $gte: threshold } }).select('name content createdAt supportcount');


    const response = [];
    posts.forEach((post, index) => {
      response[index + 1] = {
        name: post.name || 'Anonymous',
        content: post.content,
        timestamp: post.createdAt,
        supportCount: post.supportcount, // match schema field name
      };
    });

    res.json(response);
  } catch (err) {
    console.error('Error fetching popular posts:', err);
    res.status(500).json({ error: 'Failed to fetch popular posts' });
  }
});

// listens to a specific path and the second argument is a function that runs when the path is being used 
app.use('/api',authroutes)  // here the routes that are like /api/login or /api/signup will be handled by auth.js

// Finally for all unmatched routes. for static files (e.g., for client-side routing)

app.get('/{*any}', (req, res) =>res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html')));

app.listen(3000, () => console.log('Server running on http://localhost:3000'));

module.exports = app;




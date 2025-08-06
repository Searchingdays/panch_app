const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../schemas/user');
const Post = require('../schemas/posts');
const router = express.Router();

const authenticateUser = require('./middleware');

// Handle Signup request and save the user details
router.post('/signup', async (req, res) => {
  const { name, phone, password } = req.body;
  const existingUser = await User.findOne({ phone });
  if (existingUser) return res.status(400).json({ error: 'Phone already registered' });

  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ name, phone, password: hashed });
  await user.save();

  res.json({ message: 'Signup successful' });
});

// Handle Login request and return a token to the user
router.post('/login', async (req, res) => {
  const { name, phone, password } = req.body;
  const user = await User.findOne({ phone });

  try {
  if (!user){
     return res.status(400).json({ error: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch){
     return res.status(400).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE,
    sameSite:'strict',
    maxAge: 2 * 24 * 60 * 60 * 1000,
  });

  res.json({message: 'Login success'});

} catch(err) {

  console.error(err);
  res.status(500).json({ error: 'Server error. Try again later.' });

}

});

// while creating a new post.
router.post('/posts', authenticateUser, async (req, res) => {
  const user = req.user; // from decoded JWT
  const { content } = req.body;

  const newPost = new Post({
   content,
    authorName: user.name,
    authorPhone: user.phone
  });

  await newPost.save();
  res.status(201).json({ success: true });
});



// to increase the count of i support


router.patch(`/posts/:id/support`, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    post.supportcount += 1;
    await post.save();
    res.json({ success: true, supportcount: post.supportcount });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update support count' });
  }
});



module.exports = router;

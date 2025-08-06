const express = require('express');
const User = require('../schemas/posts');

const router = express.Router();

const jwt = require('jsonwebtoken');


function authenticateUser(req, res, next) {
  const token = req.cookies.token; // or from Authorization header
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user; // Attach to request
    next();
  } catch {
    return res.status(403).json({ error: 'Invalid token' });
  }
}

module.exports = authenticateUser;






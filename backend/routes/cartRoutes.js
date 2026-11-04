const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function getUser(req) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    try {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
      const userId = decoded.user?.id || decoded.id;
      if (userId) return await User.findById(userId);
    } catch (e) {}
  }
  return null;
}

router.get('/', async (req, res) => {
  try {
    const user = await getUser(req);
    res.status(200).json({
      success: true,
      items: user ? (user.cart || []) : []
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Could not load cart' });
  }
});

router.put('/', async (req, res) => {
  try {
    const user = await getUser(req);
    const items = req.body.items || [];
    if (user) {
      user.cart = items;
      await user.save();
    }
    res.status(200).json({
      success: true,
      items
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Could not update cart' });
  }
});

module.exports = router;


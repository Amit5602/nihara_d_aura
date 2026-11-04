const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const jwtSecret = process.env.JWT_SECRET || 'secret123';
      try {
        const decoded = jwt.verify(token, jwtSecret);
        const userId = decoded.user?.id || decoded.id;
        const user = await User.findById(userId).select('-password -otp -otpExpires');
        if (user) {
          req.user = user;
        }
      } catch (err) {
        // Invalid token
      }
    }
    next();
  } catch (err) {
    next();
  }
};


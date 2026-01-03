const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

// Verify JWT and attach user to request
module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check for Bearer token
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Validate user from token
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token expired or invalid' });
  }
};

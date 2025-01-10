// middlewares/auth.js

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Skip middleware check for auth and register endpoints
  if (req.path === '/auth' || req.path === '/register') {
    return next();
  }

  // Read the Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Missing authorization header' });
  }

  const token = authHeader;
  if (!token) {
    return res.status(401).json({ error: 'Token not found' });
  }

  // Verify token
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Attach token payload to request
    req.user = decoded;
    next();
  });
};

module.exports = {
  authMiddleware,
};

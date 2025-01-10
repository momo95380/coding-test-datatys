const jwt = require('jsonwebtoken');

// generate a token for a user
const generateToken = (user) => jwt.sign(
  {
    userId: user.userId,
    email: user.email,
  },
  process.env.SECRET,
  { expiresIn: '1d' },
);

// verify a token
const verifyToken = (token) => jwt.verify(token, process.env.SECRET);

module.exports = {
  generateToken,
  verifyToken,
};

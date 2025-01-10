const shajs = require('sha.js');
const userModel = require('../models/userModel');
const { generateToken } = require('../lib/jwt');

const SECRET = process.env.SECRET || '';

/**
 * Generate hash password
 * @param {string} email
 * @param {string} password
 * @returns {string} Hashed password
 */
const hashPassword = (email, password) => shajs('sha256').update(`${email}${password}${SECRET}`).digest('hex');

/**
 * Authenticate user
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{user: Object, token: string}>} User data and JWT token
 */
const authenticateUser = async (email, password) => {
  const user = await userModel.getUserByEmail(email);
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const hashedPassword = hashPassword(email, password);
  if (hashedPassword !== user.password) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken({
    userId: user.id,
    email: user.email,
  });

  return {
    user,
    token,
  };
};

/**
 * Register new user
 * @param {Object} userData User registration data
 * @returns {Promise<{user: Object, token: string}>} Created user data and JWT token
 */
const registerUser = async (userData) => {
  const hashedPassword = hashPassword(userData.email, userData.password);

  const newUser = await userModel.createUser({
    ...userData,
    password: hashedPassword,
  });

  const token = generateToken({
    userId: newUser.id,
    email: newUser.email,
  });

  return {
    user: newUser,
    token,
  };
};

module.exports = {
  authenticateUser,
  registerUser,
};

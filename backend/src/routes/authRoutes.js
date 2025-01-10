const express = require('express');
const { login, register } = require('../controllers/authController');

const router = express.Router();

/**
 * User authentication
 * @route POST /auth
 * @param {Object} req.body - User credentials
 * @param {string} req.body.email - User email
 * @param {string} req.body.password - User password
 * @returns {Object} 200 - User data and JWT token
 * @returns {Object} 401 - Authentication error
 */
router.post('/auth', login);

/**
 * User registration
 * @route POST /register
 * @param {Object} req.body - User registration data
 * @returns {Object} 200 - Created user data and JWT token
 * @returns {Object} 409 - Email already exists error
 * @returns {Object} 400 - Registration error
 */
router.post('/register', register);

module.exports = router;

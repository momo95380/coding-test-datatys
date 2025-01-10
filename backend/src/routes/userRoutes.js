const express = require('express');
const { authMiddleware } = require('../middlewares/auth');
const { getCurrentUser, updateCurrentUser, deleteCurrentUser } = require('../controllers/userController');

const router = express.Router();

/**
 * Get current user profile
 * @route GET /users/me
 * @param {Object} req.user - User data from JWT token
 * @returns {Object} 200 - User profile data
 * @returns {Object} 404 - User not found error
 */
router.get('/me', authMiddleware, getCurrentUser);

/**
 * Update current user profile
 * @route PUT /users/me
 * @param {Object} req.user - User data from JWT token
 * @param {Object} req.body - Updated user data
 * @returns {Object} 200 - Updated user data
 * @returns {Object} 404 - User not found error
 */
router.put('/me', authMiddleware, updateCurrentUser);

/**
 * Delete current user
 * @route DELETE /users/me
 * @param {Object} req.user - User data from JWT token
 * @returns {Object} 200 - Success message
 * @returns {Object} 404 - User not found error
 */
router.delete('/me', authMiddleware, deleteCurrentUser);

module.exports = router;

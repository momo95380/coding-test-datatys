const {
  getUserById,
  updateUser,
  deleteUser,
} = require('../services/userService');

/**
 * Get current user profile
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const getCurrentUser = async (req, res) => {
  try {
    const user = await getUserById(req.user.userId);
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: error.message });
  }
};

/**
 * Update current user profile
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const updateCurrentUser = async (req, res) => {
  try {
    const user = await updateUser(req.user.userId, req.body);
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: error.message });
  }
};

/**
 * Delete current user
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const deleteCurrentUser = async (req, res) => {
  try {
    await deleteUser(req.user.userId);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getCurrentUser,
  updateCurrentUser,
  deleteCurrentUser,
};

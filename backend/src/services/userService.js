const userModel = require('../models/userModel');

/**
 * Create a new user
 * @param {Object} userData - User details
 * @returns {Promise<Object>} - The created user
 */
const createUser = async (userData) => {
  const newUser = await userModel.createUser(userData);
  return newUser;
};

/**
 * Get all users
 * @returns {Promise<Array>} - Array of users
 */
const getAllUsers = async () => {
  const users = await userModel.getAllUsers();
  return users;
};

/**
 * Get a user by ID
 * @param {string} userId - ID of the user
 * @returns {Promise<Object|null>} - The user object or null if not found
 */
const getUserById = async (userId) => {
  const user = await userModel.getUserById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

/**
 * Update a user
 * @param {string} userId - ID of the user to update
 * @param {Object} userData - Data to update
 * @returns {Promise<Object|null>} - The updated user or null if not found
 */
const updateUser = async (userId, userData) => {
  const updatedUser = await userModel.updateUser(userId, userData);
  if (!updatedUser) {
    throw new Error('User not found');
  }
  return updatedUser;
};

/**
 * Delete a user
 * @param {string} userId - ID of the user to delete
 * @returns {Promise<boolean>} - true if deletion succeeded, false otherwise
 */
const deleteUser = async (userId) => {
  const deleted = await userModel.deleteUser(userId);
  if (!deleted) {
    throw new Error('User not found');
  }
  return deleted;
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};

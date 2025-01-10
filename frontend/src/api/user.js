import axios from './middleware';

/**
 * Get current user
 * @throws {Error} If request fails
 */
export async function getCurrentUser() {
  try {
    const response = await axios.get('/users/me');
    return response.data;
  } catch (error) {
    console.error('Failed to get current user:', error);
    throw error;
  }
}

/**
 * Update current user
 * @param {object} userData - Updated user data
 * @param {string} [userData.email]
 * @param {string} [userData.firstName]
 * @param {string} [userData.lastName]
 * @param {string} [userData.country]
 * @param {string} [userData.city]
 * @param {string} [userData.phoneNumber]
 * @param {string} [userData.position]
 * @throws {Error} If update fails
 */
export async function updateCurrentUser(userData) {
  try {
    const response = await axios.put('/users/me', userData);
    return response.data;
  } catch (error) {
    console.error('Failed to update user:', error);
    throw error;
  }
}

/**
 * Delete current user
 * @throws {Error} If deletion fails
 */
export async function deleteCurrentUser() {
  try {
    const response = await axios.delete('/users/me');
    return response.data;
  } catch (error) {
    console.error('Failed to delete user:', error);
    throw error;
  }
}

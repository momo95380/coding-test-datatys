import axios from './middleware';

/**
 * Authenticate user
 * @param {string} email
 * @param {string} password
 */
export default async function login(email, password) {
  const response = await axios.post('/auth', {
    email,
    password,
  });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
}

/**
 * Register a new user
 * @param {object} userData - User registration data
 * @param {string} userData.email
 * @param {string} userData.password
 * @param {string} userData.firstName
 * @param {string} userData.lastName
 * @param {string} userData.country
 * @param {string} userData.city
 * @param {string} userData.phoneNumber
 * @param {string} userData.position
 */
export async function register(userData) {
  const response = await axios.post('/register', userData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
}

const db = require('../sql/db');

/**
 * Create a new user
 * @param {Object} userData - User data
 * @returns {Promise<Object>} - Created user
 */
exports.createUser = async (userData) => {
  const {
    email,
    password,
    firstName,
    lastName,
    country,
    city,
    phoneNumber,
    position,
  } = userData;

  const query = `
    INSERT INTO users (email, password, first_name, last_name, country, city, phone_number, position)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING id, email, first_name, last_name, country, city, phone_number, position;
  `;

  const values = [email, password, firstName, lastName, country, city, phoneNumber, position];
  const { rows } = await db.query(query, values);
  return rows[0];
};

/**
 * Get all users
 * @returns {Promise<Array>} - Array of users
 */
exports.getAllUsers = async () => {
  const query = 'SELECT * FROM users;';
  const { rows } = await db.query(query);
  return rows;
};

/**
 * Get user by ID
 * @param {String} id - User ID
 * @returns {Promise<Object|null>} - User object or null if not found
 */
exports.getUserById = async (id) => {
  const query = 'SELECT * FROM users WHERE id = $1;';
  const { rows } = await db.query(query, [id]);
  return rows[0] || null;
};

/**
 * Get user by email
 * @param {String} email - User email
 * @returns {Promise<Object|null>} - User object or null if not found
 */
exports.getUserByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = $1;';
  const { rows } = await db.query(query, [email]);
  return rows[0] || null;
};

/**
 * Update user
 * @param {String} id - User ID
 * @param {Object} userData - User data to update
 * @returns {Promise<Object|null>} - Updated user or null
 */
exports.updateUser = async (id, userData) => {
  const {
    firstName,
    lastName,
    country,
    city,
    phoneNumber,
    position,
  } = userData;

  const query = `
    UPDATE users 
    SET first_name = $2,
        last_name = $3,
        country = $4,
        city = $5,
        phone_number = $6,
        position = $7,
        updated_at = NOW()
    WHERE id = $1
    RETURNING id, email, first_name, last_name, country, city, phone_number, position;
  `;

  const values = [id, firstName, lastName, country, city, phoneNumber, position];
  const { rows } = await db.query(query, values);
  return rows[0] || null;
};

/**
 * Delete user
 * @param {String} id - User ID
 * @returns {Promise<Boolean>} - true if deleted, false otherwise
 */
exports.deleteUser = async (id) => {
  const query = 'DELETE FROM users WHERE id = $1;';
  const { rowCount } = await db.query(query, [id]);
  return rowCount > 0;
};

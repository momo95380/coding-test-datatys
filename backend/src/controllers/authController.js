const { authenticateUser, registerUser } = require('../services/authService');

/**
 * User authentication controller
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await authenticateUser(email, password);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: error.message });
  }
};

/**
 * User registration controller
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const register = async (req, res) => {
  try {
    const result = await registerUser(req.body);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    if (error.message === 'Email already exists') {
      res.status(409).json({ error: error.message });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = {
  login,
  register,
};

import React, {
  createContext,
  useState,
  useEffect,
} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import login, { register } from '../api/auth';
import { getCurrentUser } from '../api/user';

export const AuthContext = createContext(null);

/**
 * AuthProvider component to provide authentication context and user state
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components to be wrapped by AuthProvider
 * @returns {ReactNode} AuthProvider component
 */
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const { user: userData } = await getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    }
  };

  // Fetch user data only when on profile route
  useEffect(() => {
    if (location.pathname === '/profile') {
      fetchUser();
    }
  }, [location.pathname]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }
    setLoading(false);
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const data = await login(email, password);
      setUser(data.user);
      navigate('/profile');
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const handleRegister = async (userData) => {
    try {
      const data = await register(userData);
      setUser(data.user);
      navigate('/profile');
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  const value = {
    user,
    loading,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;

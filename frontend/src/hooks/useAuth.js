import { useContext } from 'react';
import { AuthContext } from '../auth/AuthProvider';

/**
 * Custom hook to access the AuthContext
 * @returns {Object} AuthContext - The AuthContext object
 * @throws {Error} If used outside of an AuthProvider
 */
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;

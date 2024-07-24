// src/components/Auth/ProtectedRoute.js
import { Navigate, useNavigate } from 'react-router-dom';
import { decodeToken } from 'react-jwt';

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
  const token = localStorage.getItem('token');
  
  if (!token) {
    // No token, redirect to login
    navigate('/login');
  }

  try {
    const decodedToken = decodeToken(token);
    
    if (decodedToken.role === 'organization') {
      // User is an organization, allow access
      return children;
    } else {
      // User is not an organization, redirect to home
      navigate('/');
    }
  } catch (error) {
    // Token decoding failed, redirect to login
    navigate('/login');
  }
};

export default ProtectedRoute;

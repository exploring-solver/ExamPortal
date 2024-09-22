import React, { createContext, useState, useEffect, useContext } from 'react';
import { decodeToken } from 'react-jwt';
import { useNavigate } from 'react-router';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = decodeToken(token);
      setUser(decodedUser);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    const decodedUser = decodeToken(token);
    setUser(decodedUser);
    setIsAuthenticated(true);
    setLoading(false);

    // Programmatically navigate based on role
    if (decodedUser.role === 'organization') {
      window.location.href = '/organization'; // Redirect to organization dashboard
    } else {
      window.location.href = '/'; // Redirect to the default route
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
    alert('Logout Successful');
    navigate('/login'); // Redirect to login page on logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

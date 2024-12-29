// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Optionally, fetch the user data from the backend with the token
      setUser({ displayName: 'User' }); // Replace with actual user fetching
    }
  }, []);

  const login = (token) => {
    // Perform login actions
    setUser({ displayName: 'User' }); // Set the user data here
  };

  const logout = () => {
    setUser(null); // Clear user data
    localStorage.removeItem('token'); // Remove token from localStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

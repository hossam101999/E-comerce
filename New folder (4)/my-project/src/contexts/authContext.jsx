import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const userString = localStorage.getItem('currentUser');
    
    if (token) {
      setIsAuthenticated(true);
    }

    if (userString) {
      try {
        const user = JSON.parse(userString);
        setCurrentUser(user);
      } catch (error) {
        console.error("Failed to parse currentUser from localStorage:", error);
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  const login = (user, token) => {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('currentUser', JSON.stringify(user));
    setIsAuthenticated(true);
    setCurrentUser(user);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUser');
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  const updateUser = (updatedUser) => {
    // يمكن استبدال هذه الكود بعملية تحديث حقيقية في السيرفر إذا لزم الأمر
    const updatedCurrentUser = { ...currentUser, ...updatedUser };
    localStorage.setItem('currentUser', JSON.stringify(updatedCurrentUser));
    setCurrentUser(updatedCurrentUser);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

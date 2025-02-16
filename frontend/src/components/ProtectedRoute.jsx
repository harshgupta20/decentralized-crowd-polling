import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ element }) => {
  const { isUserAuthenticated } = useContext(AuthContext);

  // Check if user is authenticated
  if (!isUserAuthenticated.token) {
    // If not authenticated, redirect to home (or login page)
    return <Navigate to="/" />;
  }

  // If authenticated, render the protected route element
  return element;
};

export default ProtectedRoute;

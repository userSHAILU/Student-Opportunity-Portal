import React from 'react';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex-center h-full">Loading...</div>;
  }

  if (!user) {
    window.location.href = '/login';
    return null;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="flex-center h-full">
        <div className="card">
          <h2>Access Denied</h2>
          <p className="text--muted mt">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;

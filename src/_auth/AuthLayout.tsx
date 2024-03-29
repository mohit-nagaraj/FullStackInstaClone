import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const AuthLayout = () => {
  const isAuthenticated = false;

  return (
    <div>
      {isAuthenticated
        ? (
          <Navigate to="/" />
        )
        : (
          <section>
            <Outlet />
          </section>
        )}
    </div>
  );
};

export default AuthLayout;

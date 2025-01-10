import React from 'react';
import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import ProfilePage from '../pages/profile';
import LoginPage from '../pages/LoginPage';

function Router() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/profile"
        element={<ProfilePage />}
      />
      <Route path="/" element={<Navigate to="/profile" />} />
    </Routes>
  );
}

export default Router;

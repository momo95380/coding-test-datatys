import React from 'react';
import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import ProfilePage from '../pages/profile';

function Router() {
  return (
    <Routes>
      <Route
        path="/profile"
        element={<ProfilePage />}
      />
      <Route path="/" element={<Navigate to="/profile" />} />
    </Routes>
  );
}

export default Router;

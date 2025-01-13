import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import HospitalManagerDashboard from './pages/HospitalManagerDashboard';
import InnerPantryDashboard from './pages/InnerPantryDashboard';
import DeliveryPersonnelDashboard from './pages/DeliveryPersonnelDashboard';
import { AuthProvider, useAuth } from './context/AuthContext';

import './styles/global.css';

// Protected Route Component to check if the user is authenticated
const ProtectedRoute = ({ element }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return element;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/foodDeliveryManager" element={<ProtectedRoute element={<HospitalManagerDashboard />} />} />
          <Route path="/innerPantry" element={<ProtectedRoute element={<InnerPantryDashboard />} />} />
          <Route path="/deliveryPersonnel" element={<ProtectedRoute element={<DeliveryPersonnelDashboard />} />} />
          {/* Redirect to login if no route matches */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;




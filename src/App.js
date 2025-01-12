import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import HospitalManagerDashboard from './pages/HospitalManagerDashboard';
import InnerPantryDashboard from './pages/InnerPantryDashboard';
import DeliveryPersonnelDashboard from './pages/DeliveryPersonnelDashboard';
import { AuthProvider } from './context/AuthContext';

import './styles/global.css';




const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/foodDeliveryManager" element={<HospitalManagerDashboard />} />
          <Route path="/innerPantry" element={<InnerPantryDashboard />} />
          <Route path="/deliveryPersonnel" element={<DeliveryPersonnelDashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

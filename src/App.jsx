import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { WalletProvider } from './context/WalletContext';
import { VehicleProvider } from './context/VehicleContext';

// Pages
import HomePage from './pages/HomePage';
import FindChargersPage from './pages/FindChargersPage';
import ChargerDetailsPage from './pages/ChargerDetailsPage';
import WalletPage from './pages/WalletPage';
import HostDashboardPage from './pages/HostDashboardPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProfilePage from './pages/ProfilePage';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <WalletProvider>
          <VehicleProvider>
            <Routes>
              {/* Core 5 Pages requested by User */}
              <Route path="/" element={<HomePage />} />
              <Route path="/chargers" element={<FindChargersPage />} />
              <Route path="/chargers/:id" element={<ChargerDetailsPage />} />
              <Route path="/wallet" element={<WalletPage />} />
              <Route path="/host" element={<HostDashboardPage />} />
              
              {/* Additional Company & Auth Pages preserving original functionality */}
              <Route path="/about" element={<AboutPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/profile" element={<ProfilePage />} />

              {/* Catch-all redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </VehicleProvider>
        </WalletProvider>
      </AuthProvider>
    </Router>
  );
}


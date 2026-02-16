import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import './index.css';

import Login from './components/Login';
import Register from './components/Register';
import Loading from './components/Loading';
import ProtectedRoute from './components/ProtectedRoute';
import App from './App';

const AppWrapper = () => {
  const { loginLoading } = useAuth();

  return (
    <>
      {loginLoading && <Loading />}
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/students" element={<ProtectedRoute><App /></ProtectedRoute>} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <AppWrapper />
    </AuthProvider>
  </React.StrictMode>
);

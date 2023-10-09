import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import HeaderBar from './components/HeaderBar';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage';
import ProfilePage from './pages/ProfilePage';

import { storageHandler } from './utils/storage_handler';

function PrivateRoute({ children }) {
  let navigate = useNavigate();
  const token = storageHandler.localStorageGet('token');

  useEffect(() => {
    if (token) {
      let decoded = jwt_decode(token);
      let isNotExpired = decoded.exp && decoded.exp > Date.now()/1000;
      if(!isNotExpired){
        storageHandler.localStorageDelete('token');
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [token, navigate]);

  return children;
}

function App() {
  return (
    <Router>
      <HeaderBar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;

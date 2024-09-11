import React, { useState } from 'react';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import Headerpage from './pages/Headerpage';
import Footerpage from './pages/Footerpage';
import LoginPage from './pages/Loginpage';
import HomePage from './pages/Homepage';
import { Route, Routes } from 'react-router-dom';


function App() {
  

  return (
    <div className="min-h-screen flex flex-col">
      <Headerpage/>
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          
        </Routes>
      </div>
      <Footerpage />
    </div>
  );
}

export default App;

import React from 'react';
import { Routes, Route } from 'react-router-dom'; // No Router here!
import Home from './pages/Home';
import BookDetail from './pages/BookDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import Navbar from './components/Navbar';
import AuthProvider from './context/AuthContext';
import './App.css';

const App = () => {
  return (
    <AuthProvider>
      {/* Removed <Router> wrapper */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:id" element={<BookDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
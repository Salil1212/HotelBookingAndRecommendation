import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HotelList from "./components/HotelList";
import HotelDetail from "./components/HotelDetail";
import "./styles.css";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import Home from "./components/Home";
import { Button } from "react-bootstrap";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <header className="app-header">
            <h1>Hotel Booking & Recommendation Platform</h1>
          </header>
          <main className="app-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/hotellist" element={<HotelList />} />
              <Route path="/hotels/:id" element={<HotelDetail />} />
            </Routes>
          </main>
          <footer className="app-footer">
            <p>&copy; 2024 Hotel Booking & Recommendation Platform</p>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

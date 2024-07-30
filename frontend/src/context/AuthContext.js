import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // corrected import for jwtDecode

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setAuth({ token, user: decodedToken });
    }
  }, []);

  const login = async (name, email) => {
    try {
      console.log("Attempting login with:", { name, email });
      const response = await axios.post(
        "https://hotel-booking-and-recommendation.vercel.app/api/auth/login",
        { name, email }
      );
      console.log("Response from login:", response.data);
       const token=response.data.token
      localStorage.setItem("token", token);
      const decodedToken = jwtDecode(token);
      setAuth({ token, user: decodedToken });
      setErrorMessage(""); // Clear any previous error message
      setFlag(!flag);
    } catch (error) {
      console.error(
        "Login error:",
        error.response ? error.response.data : error
      );
      setErrorMessage("Invalid username or email"); // Set the error message
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth(null);
    setFlag(!flag);
  };

  const isAdmin = () => auth && auth.user && auth.user.role === "Admin";

  return (
    <AuthContext.Provider
      value={{ auth, login, logout, isAdmin, errorMessage, flag, setFlag }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };


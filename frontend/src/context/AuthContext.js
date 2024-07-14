// import React, { createContext, useState, useEffect } from "react";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode"; // corrected import for jwtDecode

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       const decodedToken = jwtDecode(token);
//       setAuth({ token, user: decodedToken });
//     }
//   }, []);

//   const login = async (name, email) => {
//     try {
//       console.log("Attempting login with:", { name, email });
//       const response = await axios.post(
//         "http://localhost:5000/api/auth/login",
//         { name, email }
//       );
//       if (!response) {
//         return <div>Error username or emailid</div>;
//       }
//       console.log("Response from login:", response.data);
//       const token = response.data.token;
//       localStorage.setItem("token", token);
//       const decodedToken = jwtDecode(token);
//       setAuth({ token, user: decodedToken });
//     } catch (error) {
//       console.error(
//         "Login error:",
//         error.response ? error.response.data : error
//       );
//       throw error;
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setAuth(null);
//   };

//   const isAdmin = () => auth && auth.user && auth.user.role === "Admin";

//   return (
//     <AuthContext.Provider value={{ auth, login, logout, isAdmin }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export { AuthContext, AuthProvider };
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // corrected import for jwtDecode

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

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
        "http://localhost:5000/api/auth/login",
        { name, email }
      );
      console.log("Response from login:", response.data);
      const token = response.data.token;
      localStorage.setItem("token", token);
      const decodedToken = jwtDecode(token);
      setAuth({ token, user: decodedToken });
      setErrorMessage(""); // Clear any previous error message
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
  };

  const isAdmin = () => auth && auth.user && auth.user.role === "Admin";

  return (
    <AuthContext.Provider
      value={{ auth, login, logout, isAdmin, errorMessage }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

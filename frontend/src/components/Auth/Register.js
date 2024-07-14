import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap"; // Import Bootstrap components
import "./Register.css"; // Import custom CSS file for Register page

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", formData);
      setMessage("User registered successfully!");
      navigate("/login");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <Container className="register-container mt-4">
      <Form onSubmit={handleSubmit} className="register-form">
        <h2 className="register-heading">Register</h2>
        {message && <p className="message">{message}</p>}
        <Form.Group controlId="fullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter full name"
            required
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
        </Form.Group>

        <div className="btn-group">
          <Button variant="primary" type="submit" className="btn-register">
            Register
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate("/login")}
            className="btn-login"
          >
            Login
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default Register;

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import "./HotelList.css"; // Import the custom CSS for additional styling

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  useEffect(() => {
    axios.get("http://localhost:5000/hotels").then((response) => {
      setHotels(response.data);
    });
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Explore Our Hotels</h1>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {hotels.map((hotel) => (
          <Col key={hotel._id}>
            <Card className="h-100 hotel-card">
              <Card.Img
                variant="top"
                src={hotel.image}
                alt={hotel.name}
                className="hotel-card-img"
              />
              <Card.Body>
                <Card.Title className="hotel-card-title">
                  {hotel.name}
                </Card.Title>
                <Link
                  to={`/hotels/${hotel._id}`}
                  className="btn btn-primary hotel-card-btn"
                >
                  View Details
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="mt-4 text-center">
        <Button onClick={handleLogout} variant="danger" className="logout-btn">
          Logout
        </Button>
      </div>
    </div>
  );
};

export default HotelList;

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./HotelDetail.css"; // Import the custom CSS for additional styling

const HotelDetail = () => {
  const { id } = useParams();
  const { logout, auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [hotel, setHotel] = useState({});
  const [activityLogged, setActivityLogged] = useState(false); // Local state to track activity logging

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await axios.get(`https://hotel-booking-and-recommendation.vercel.app/hotels`);
        const hotelData = response.data.find((h) => h._id === id);
        if (hotelData) {
          setHotel(hotelData);

          // Post visit activity only if it hasn't been logged
          if (!activityLogged) {
            await axios.post(`http://localhost:5000/hotels/${id}/visit`, {
              userId: auth.user.id,
              hotelId: hotelData._id, // Use hotelData here
              type: "visit",
            });
            setActivityLogged(true); // Set activityLogged to true to prevent re-logging
          }
        }
      } catch (error) {
        console.error(
          "Error fetching hotel details or posting activity:",
          error
        );
      }
    };

    if (auth) {
      fetchHotelDetails();
    }
  }, [auth]); // Added activityLogged to dependencies

  return (
    <div className="hotel-detail-container">
      <div
        className="hotel-detail-background"
        style={{
          backgroundImage: `url(${
            hotel.image ||
            "https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="overlay">
          <Container>
            <Row className="justify-content-center text-center">
              <Col md={8}>
                <Card className="hotel-detail-card">
                  <Card.Body>
                    <Card.Title className="hotel-detail-title">
                      {hotel.name}
                    </Card.Title>
                    <Card.Text className="hotel-detail-text">
                      <strong>Location:</strong> {hotel.location}
                    </Card.Text>
                    <Card.Text className="hotel-detail-text">
                      <strong>Rating:</strong> {hotel.rating} / 5
                    </Card.Text>
                    <Button
                      onClick={handleLogout}
                      variant="danger"
                      className="logout-btn"
                    >
                      Logout
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;

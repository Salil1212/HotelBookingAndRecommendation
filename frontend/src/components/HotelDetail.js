// // // components/HotelDetail.js
// // import React, { useEffect, useState, useContext } from "react";
// // import axios from "axios";
// // import { useParams } from "react-router-dom";
// // import { Button } from "react-bootstrap";
// // import { AuthContext } from "../context/AuthContext";
// // import { useNavigate } from "react-router-dom";

// // const HotelDetail = () => {
// //   const { id } = useParams();
// //   const { logout } = useContext(AuthContext);
// //   const navigate = useNavigate();
// //   const [hotel, setHotel] = useState([]);
// //   const [activities, setActivities] = useState([]);
// //   const handleLogout = async () => {
// //     await logout();
// //     navigate("/login");
// //   };
// //   useEffect(() => {
// //     axios
// //       .get(`http://localhost:5000/hotels/getDetail/?hotelId=${id}`)
// //       .then((response) => {
// //         console.log(id);
// //         console.log(response.data);
// //         setHotel(response.data);
// //       });
// //   }, [id]);

// //   return (
// //     <div className="container">
// //       <ul className="list-group">
// //         {hotel.map((hotel) => (
// //           <div key={hotel._id}>
// //             <h1>{hotel.name}</h1>
// //             <p>{hotel.location}</p>
// //             <h2>{hotel.rating}</h2>
// //           </div>
// //         ))}
// //       </ul>
// //       <Button onClick={handleLogout}>Logout</Button>
// //       {/* <ul className="list-group">
// //         {activities.map((activity) => (
// //           <li key={activity._id} className="list-group-item">
// //             {activity.type} - {new Date(activity.timestamp).toLocaleString()}
// //           </li>
// //         ))}
// //       </ul> */}
// //     </div>
// //   );
// // };

// // export default HotelDetail;

// // // import React from "react";

// // // const HotelDetail = () => {
// // //   return <div>This is hotelDetail</div>;
// // // };

// // // export default HotelDetail;
// import React, { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { Button, Container, Row, Col, Card } from "react-bootstrap";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import "./HotelDetail.css"; // Import the custom CSS for additional styling

// const HotelDetail = () => {
//   const { id } = useParams();
//   const { logout } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [hotel, setHotel] = useState({});

//   const handleLogout = async () => {
//     await logout();
//     navigate("/login");
//   };

//   useEffect(() => {
//     axios.get(`http://localhost:5000/hotels`).then((response) => {
//       const hotelData = response.data.find((h) => h._id === id);
//       setHotel(hotelData);
//     });
//   }, [id]);

//   return (
//     <div className="hotel-detail-container">
//       <div
//         className="hotel-detail-background"
//         style={{
//           backgroundImage: `url(${
//             hotel.image ||
//             "https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//           })`,
//         }}
//       >
//         <div className="overlay">
//           <Container>
//             <Row className="justify-content-center text-center">
//               <Col md={8}>
//                 <Card className="hotel-detail-card">
//                   <Card.Body>
//                     <Card.Title className="hotel-detail-title">
//                       {hotel.name}
//                     </Card.Title>
//                     <Card.Text className="hotel-detail-text">
//                       <strong>Location:</strong> {hotel.location}
//                     </Card.Text>
//                     <Card.Text className="hotel-detail-text">
//                       <strong>Rating:</strong> {hotel.rating} / 5
//                     </Card.Text>
//                     <Button
//                       onClick={handleLogout}
//                       variant="danger"
//                       className="logout-btn"
//                     >
//                       Logout
//                     </Button>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             </Row>
//           </Container>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HotelDetail;
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./HotelDetail.css"; // Import the custom CSS for additional styling

const HotelDetail = () => {
  const { id } = useParams();
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [hotel, setHotel] = useState({});

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/hotels`).then((response) => {
      const hotelData = response.data.find((h) => h._id === id);
      if (hotelData) {
        setHotel(hotelData);
      }
    });
  }, [id]);

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

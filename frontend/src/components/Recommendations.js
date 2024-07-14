// components/Recommendations.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const Recommendations = ({ userId }) => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/recommendations?userId=${userId}`)
      .then((response) => {
        setHotels(response.data);
      });
  }, [userId]);

  return (
    <div className="container">
      <h2>Recommended Hotels</h2>
      <ul className="list-group">
        {hotels.map((hotel) => (
          <li key={hotel._id} className="list-group-item">
            {hotel.hotelId}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendations;

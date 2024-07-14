// components/HotelDetail.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const HotelDetail = () => {
  const { id } = useParams();

  const [hotel, setHotel] = useState([]);
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/hotels/getDetail/?hotelId=${id}`)
      .then((response) => {
        console.log(id);
        console.log(response.data);
        setHotel(response.data);
      });
    //     axios
    //       .get(`http://localhost:5000/hotels/${id}/activities`)
    //       .then((response) => {
    //         setActivities(response.data);
    //       });
  }, [id]);

  //     axios
  //       .get(`http://localhost:5000/hotels/${id}/activities`)
  //       .then((response) => {
  //         setActivities(response.data);
  //       });
  //   }, [id]);

  return (
    <div className="container">
      {/* <h1>{hotel.name}</h1>
      <p>{hotel.location}</p>
      <h2>Activities</h2> */}

      <ul className="list-group">
        {hotel.map((hotel) => (
          <div key={hotel._id}>
            <h1>{hotel.name}</h1>
            <p>{hotel.location}</p>
            <h2>{hotel.rating}</h2>
          </div>
        ))}
      </ul>
      {/* <ul className="list-group">
        {activities.map((activity) => (
          <li key={activity._id} className="list-group-item">
            {activity.type} - {new Date(activity.timestamp).toLocaleString()}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default HotelDetail;

// import React from "react";

// const HotelDetail = () => {
//   return <div>This is hotelDetail</div>;
// };

// export default HotelDetail;

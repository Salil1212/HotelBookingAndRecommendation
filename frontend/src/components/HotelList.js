// // components/HotelList.js
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const HotelList = () => {
//   const [hotels, setHotels] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:5000/hotels").then((response) => {
//       setHotels(response.data);
//     });
//   }, []);
//   //   http://localhost:5000/hotels/getDetail/?hotelId=66926456e0efa06ac81bbf91
//   return (
//     <div className="container">
//       <h1>Hotels</h1>
//       <ul className="list-group">
//         {hotels.map((hotel) => (
//           <li key={hotel._id} className="list-group-item">
//             <Link to={`/hotels/${hotel._id}`}>{hotel.name}</Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default HotelList;
// // import React from "react";

// // const HotelList = () => {
// //   return <div>This is hotel list </div>;
// // };

// // export default HotelList;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HotelList = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/hotels").then((response) => {
      setHotels(response.data);
    });
  }, []);

  return (
    <div className="container">
      <h1 className="mb-4">Hotels</h1>
      <ul className="list-group">
        {hotels.map((hotel) => (
          <li key={hotel._id} className="list-group-item">
            <Link to={`/hotels/${hotel._id}`}>{hotel.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HotelList;

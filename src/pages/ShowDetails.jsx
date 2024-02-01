// src/components/ShowDetails.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ShowDetails.css"; // Import CSS file for styling
import ShowInfo from "../components/ShowInfo";

const ShowDetails = () => {
  const { id } = useParams();
  const [showDetails, setShowDetails] = useState(null);
  const [bookingFormVisible, setBookingFormVisible] = useState(false);
  const [userData, setUserData] = useState({
    userName: "",
    userEmail: "",
    movieName: "",
  });

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        // Fetch details of a specific show from TV Maze API
        const response = await axios.get(`https://api.tvmaze.com/shows/${id}`);
        setShowDetails(response.data);

        // Set default movie name in user data
        setUserData((prevUserData) => ({
          ...prevUserData,
          movieName: response.data.name,
        }));
      } catch (error) {
        console.error("Error fetching show details:", error);
      }
    };

    fetchShowDetails();
  }, [id]);

  const handleBookingButtonClick = () => {
    // Show booking form and populate with user data from local storage
    setUserData((prevUserData) => ({
      ...prevUserData,
      userName: localStorage.getItem("userName") || "",
      userEmail: localStorage.getItem("userEmail") || "",
    }));
    setBookingFormVisible(true);
  };

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Store user data in local storage
    localStorage.setItem("userName", userData.userName);
    localStorage.setItem("userEmail", userData.userEmail);

    // Process the booking (you can add more logic here)

    // Close the form
    setBookingFormVisible(false);
  };

  return (
    <div>
      {showDetails && (
        <div>
          <h2>{showDetails.name}</h2>
          <img
            src={showDetails.image.medium}
            alt={showDetails.name}
            style={{ maxWidth: "100%" }}
          />
          {/* <p>
            {showDetails.summary
              .replace("<p>", "")
              .replace("</p>", "")
              .replace("<b>", "")
              .replace("</b>", "")
              .replace("<i>", "")
              .replace("</i>", "")
              .replace("</ br>", "")}
          </p> */}
          <ShowInfo show={showDetails} />
          <button onClick={handleBookingButtonClick}>Book Movie Ticket</button>
        </div>
      )}

      {/* Booking Form Popup */}
      {bookingFormVisible && (
        <div className="popup">
          <form className="popup-form" onSubmit={handleFormSubmit}>
            <h3>Booking Form</h3>
            <label>
              Name:
              <input
                type="text"
                name="userName"
                value={userData.userName}
                onChange={handleFormInputChange}
                required
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="userEmail"
                value={userData.userEmail}
                onChange={handleFormInputChange}
                required
              />
            </label>
            <label>
              Movie Name:
              <input
                type="text"
                name="movieName"
                value={userData.movieName}
                readOnly
              />
            </label>
            <button type="submit">Submit</button>
            <button type="button" onClick={() => setBookingFormVisible(false)}>
              Close
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ShowDetails;

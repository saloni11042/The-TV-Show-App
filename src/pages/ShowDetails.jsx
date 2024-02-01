
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ShowDetails.css"; 
import ShowInfo from "../components/ShowInfo";

function ShowDetails(){
  const { id } = useParams();
  const [showDetails, setShowDetails] = useState(null);
  const [bookingFormVisible, setBookingFormVisible] = useState(false);
  const [userData, setUserData] = useState({
    userName: "",
    userEmail: "",
    showName: "",
  });

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await axios.get(`https://api.tvmaze.com/shows/${id}`);
        setShowDetails(response.data);


        setUserData((prevUserData) => ({
          ...prevUserData,
          showName: response.data.name,
        }));
      } catch (error) {
        console.error("Error fetching show details:", error);
      }
    };

    fetchShowDetails();
  }, [id]);

  const handleBookingButtonClick = () => {
   
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

   
    localStorage.setItem("userName", userData.userName);
    localStorage.setItem("userEmail", userData.userEmail);

   
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
                name="showName"
                value={userData.showName}
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

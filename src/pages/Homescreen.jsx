// src/components/ShowList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Row from "../components/Row";

function Homescreen(){
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await axios.get("https://api.tvmaze.com/shows");
        setShows(response.data);
      } catch (error) {
        console.error("Error fetching shows:", error);
      }
    };

    fetchShows();
  }, []);

  return (
    <div>
      <Header>HomeScreen</Header>
      <div className='container-fluid'>
      <Row genreId={1} genreName="Drama" />
      <Row genreId={2} genreName="Crime" />
      <Row genreId={3} genreName="Horror" />
      <Row genreId={4} genreName="Comedy" />
      </div>
    </div>
  );
};

export default Homescreen;

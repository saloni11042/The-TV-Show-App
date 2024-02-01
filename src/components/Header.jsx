// src/components/HeroHeader.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Header.css";
import ShowInfo from "./ShowInfo";

const Header = () => {
  const [randomShow, setRandomShow] = useState(null);

  const handleClick = () => {};

  useEffect(() => {
    const fetchRandomShow = async () => {
      try {
        const response = await axios.get("https://api.tvmaze.com/shows");
        const randomIndex = Math.floor(Math.random() * response.data.length);
        const randomShowData = response.data[randomIndex];

        setRandomShow(randomShowData);
      } catch (error) {
        console.error("Error fetching random show:", error);
      }
    };

    fetchRandomShow();
  }, []);

  return (
    <div className="hero-header-container">
      {randomShow && (
        <div className="hero-header">
          <div className="hero-image">
            <img src={randomShow.image.medium} alt={randomShow.name} />
          </div>
          <div className="hero-info">
             <ShowInfo show={randomShow} />
            <button className="btn btn-primary" onClick={handleClick}>
              Show Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;

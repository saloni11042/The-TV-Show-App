
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ShowInfo from "./ShowInfo";

function Row({ genreId, genreName }) {
  const [genreShows, setGenreShows] = useState([]);

  useEffect(() => {
    const fetchGenreShows = async () => {
      try {
  
        const response = await axios.get(
          `https://api.tvmaze.com/shows/${genreId}/episodes`
        );
        setGenreShows(response.data);
      } catch (error) {
        console.error(`Error fetching ${genreName} shows:`, error);
      }
    };

    fetchGenreShows();
  }, [genreId, genreName]);

  const settings = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div>
      <h2>{genreName} Shows</h2>
      <Swiper
        {...settings}
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={5}
      >
        {genreShows.map((show) => {
          return (
            <SwiperSlide key={show.id}>
              <Link to={`/show/${show.id}`}>
                <img src={show.image.medium} alt={show.name} />
                <p>{show.name}</p>
              </Link>
           
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Link to={`/allshows/${genreId}`}>
        <p>View All {genreName} Shows</p>
      </Link>
    </div>
  );
}

export default Row;

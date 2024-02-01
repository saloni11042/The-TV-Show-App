// src/components/ViewAllShows.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AllShows(){
  const [allShows, setAllShows] = useState([]);

  useEffect(() => {
    const fetchAllShows = async () => {
      try {
        // Fetch all shows from TV Maze API
        const response = await axios.get('https://api.tvmaze.com/shows');
        setAllShows(response.data);
      } catch (error) {
        console.error('Error fetching all shows:', error);
      }
    };

    fetchAllShows();
  }, []);

  return (
    <div>
      <h2>All Shows</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {allShows.map((show) => (
          <div key={show.id} style={{ margin: '10px', maxWidth: '200px' }}>
            <Link to={`/show/${show.id}`}>
              <img src={show.image.medium} alt={show.name} style={{ maxWidth: '100%' }} />
            </Link>
            <Link to={`/show/${show.id}`}>
              <p>{show.name}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllShows;

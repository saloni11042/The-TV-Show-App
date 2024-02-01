
import React from 'react';
import StarRating from './StarRating';

function ShowInfo({ show }){
  return (
    <div className="show-info">
      <h1>{show.name}</h1>
      <p>{show.summary}</p>
      <div className="details">
        <p>
          <strong>Rating:</strong> {show.rating.average || 'N/A'}
        </p>
        <p>
          <strong>Genre:</strong> {show.genres.join(', ')}
        </p>
        
        <p>
          <strong>Rating:</strong> 
          <StarRating voteAverage={show.rating.average} />
          {show.rating.average ? show.rating.average.toFixed(1) : 'N/A'}
        </p>
        
      </div>
    </div>
  );
};

export default ShowInfo;

import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

function StarRating(props) {
    const {voteAverage} = props;
    let voteNumber = voteAverage / 2;
    let vote = Math.floor(voteNumber);
    let totalStars = [...Array(5)];
    
    return (
        <div className='py-2 d-flex align-items-center'>
            <div className="d-flex">
            {
                totalStars.map((item, index)=>{
                    return (                   
                        vote > index ?     
                        <FontAwesomeIcon className='text-warning' icon={faStarSolid}/> :
                        <FontAwesomeIcon icon={faStar}/>
                    )
                })
            }
            </div>
            
        </div>
    );
}

export default StarRating;
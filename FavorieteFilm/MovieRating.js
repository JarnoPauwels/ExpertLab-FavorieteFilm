import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const MovieRating = ({ score, onRateMovie, iconSize }) => {
  const [selectedScore, setSelectedScore] = useState(score);

  const handleRate = (newScore) => {
    setSelectedScore(newScore);
    onRateMovie(newScore);
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handleRate(star)}
        >
          <FontAwesomeIcon
            icon={faStar}
            style={{
              cursor: 'pointer',
              color: star <= selectedScore ? 'gold' : 'gray',
            }}
            size={iconSize}
          />
        </span>
      ))}
    </div>
  );
};

export default MovieRating;

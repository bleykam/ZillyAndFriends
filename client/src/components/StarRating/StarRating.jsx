
import { useState } from 'react';
import './StarRating.scss'

export const StarIcon = ({ selected, onSelect }) => {
  
  return (
    <span
      className={`star ${selected ? 'selected' : ''}`}
      onClick={onSelect}
    >
      ★
    </span>
  );
};


const StarRating = ({ onRatingChange }) => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
    onRatingChange(selectedRating); // Call the callback function with the new rating
  };

  return (
    <div className="star-rating d-flex  justify-content-center align-items-center">
      {Array.from({ length: 5 }).map((_, index) => (
        <StarIcon
          key={index}
          selected={index < rating}
          onSelect={() => handleStarClick(index + 1)}
        />
      ))}
      <p className="star-text">Selected rating: {rating} stars</p>
    </div>
  );
};

export default StarRating;




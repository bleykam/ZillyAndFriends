// StarIcon.js



export const Stars = () => {
  return (
    <span
      className="star selected">
      ★
    </span>
    
  );
};

const StarsAmt= ({totalStars }) => {
  const starIcons =Array.from({ length: totalStars }).map((_, index) => (
    <Stars
      key={index}
      selected={index < totalStars}

    />
  ))

  return (
    <div className="star-rating">
      {starIcons}
    </div>
  );
};


export default StarsAmt;

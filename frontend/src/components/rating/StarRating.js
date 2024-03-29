import React from 'react';

const StarRating = ({  initialRating }) => {
  const rating = Math.round(initialRating) || 0;



  return (
    <div>
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          style={{
            cursor: 'pointer',
            color: index < rating ? 'gold' : 'gray',
          }}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default StarRating;

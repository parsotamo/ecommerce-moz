import React from 'react';

const Rating = ({ star, review }) => {
  return (
    <div>
      <span>
        {star >= 1 ? (
          <i className='fas fa-star fa-xs text-warning'></i>
        ) : star >= 0.5 ? (
          <i className='fas fa-star-half fa-xs text-warning'></i>
        ) : (
          <i className='far fa-star fa-xs text-warning'></i>
        )}
      </span>
      <span>
        {star >= 2 ? (
          <i className='fas fa-star fa-xs text-warning'></i>
        ) : star >= 1.5 ? (
          <i className='fas fa-star-half fa-xs text-warning'></i>
        ) : (
          <i className='far fa-star fa-xs text-warning'></i>
        )}
      </span>
      <span>
        {star >= 3 ? (
          <i className='fas fa-star fa-xs text-warning'></i>
        ) : star >= 2.5 ? (
          <i className='fas fa-star-half fa-xs text-warning'></i>
        ) : (
          <i className='far fa-star fa-xs text-warning'></i>
        )}
      </span>
      <span>
        {star >= 4 ? (
          <i className='fas fa-star fa-xs text-warning'></i>
        ) : star >= 3.5 ? (
          <i className='fas fa-star-half fa-xs text-warning'></i>
        ) : (
          <i className='far fa-star fa-xs text-warning'></i>
        )}
      </span>
      <span>
        {star >= 5 ? (
          <i className='fas fa-star fa-xs text-warning'></i>
        ) : star >= 4.5 ? (
          <i className='fas fa-star-half fa-xs text-warning'></i>
        ) : (
          <i className='far fa-star fa-xs text-warning'></i>
        )}
      </span>
      {review && (
        <span className='text-muted ms-2'>{review} comentário(s)</span>
      )}
    </div>
  );
};

export default Rating;

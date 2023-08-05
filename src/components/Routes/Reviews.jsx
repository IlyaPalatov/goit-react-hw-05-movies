import React, { useEffect, useState } from 'react';
import { getMovieReviews } from '../Api'; 

const Reviews = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getMovieReviews(movieId)
      .then((response) => {
        setReviews(response);
      })
      .catch((error) => {
        console.error('Error fetching movie reviews:', error);
      });
  }, [movieId]);

  return (
    <div>
      <h1>Reviews</h1>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <p>{review.author}</p>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Ooops! Nothing was found.</p>
      )}
    </div>
  );
};

export default Reviews;

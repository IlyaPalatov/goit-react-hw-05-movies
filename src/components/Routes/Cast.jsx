// Cast.jsx
import React, { useEffect, useState } from 'react';
import { getMovieCredits } from '../Api';

const Cast = ({ movieId }) => {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    getMovieCredits(movieId)
      .then((cast) => {
        setCast(cast);
      })
      .catch((error) => {
        console.error('Error fetching movie credits:', error);
      });
  }, [movieId]);

  return (
    <div>
      <h1>Cast</h1>
      {cast.map((actor) => (
        <div key={actor.id}>
          <img
            src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
            alt={actor.name}
          />
          <p>{actor.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Cast;
import React, { useEffect, useState } from 'react';
import { useParams, Route, Routes, Link } from 'react-router-dom';
import { getMovieDetails } from '../Api';
import Cast from './Cast';
import Reviews from './Reviews';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState({});

  useEffect(() => {
    getMovieDetails(movieId)
      .then((movie) => {
        setMovieDetails(movie);
      })
      .catch((error) => {
        console.error('Error fetching movie details:', error);
      });
  }, [movieId]);

  return (
    <div>
      <h1>{movieDetails.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
        alt={movieDetails.title}
      />
      <p>{movieDetails.overview}</p>

       
      <Link to={`/movies/${movieId}/cast`}>Cast</Link>

      <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>

      <Routes>
        <Route path="cast" element={<Cast movieId={movieId} />} />
        <Route path="reviews" element={<Reviews movieId={movieId} />} />
      </Routes>
    </div>
  );
};

export default MovieDetails;

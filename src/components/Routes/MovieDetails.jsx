import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails, getMovieCredits } from '../Api';
import Cast from './Cast';
import Reviews from './Reviews';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [cast, setCast] = useState([]);
  const [showCast, setShowCast] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  const navigate = useNavigate(); // Get the navigate function

  useEffect(() => {
    getMovieDetails(movieId)
      .then((movie) => {
        setMovieDetails(movie);
      })
      .catch((error) => {
        console.error('Error fetching movie details:', error);
      });

    getMovieCredits(movieId)
      .then((cast) => {
        setCast(cast);
      })
      .catch((error) => {
        console.error('Error fetching cast:', error);
      });
  }, [movieId]);

  const handleShowCast = () => {
    setShowCast(true);
    setShowReviews(false);
    navigate(`/movies/${movieId}/cast`); // Change URL to include '/cast'
  };

  const handleShowReviews = () => {
    setShowReviews(true);
    setShowCast(false);
    navigate(`/movies/${movieId}/reviews`); // Change URL to include '/reviews'
  };

  return (
    <div>
      <h1>{movieDetails.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
        alt={movieDetails.title}
      />
      <p>{movieDetails.overview}</p>

      <button onClick={handleShowCast}>Cast</button>
      <button onClick={handleShowReviews}>Reviews</button>

      {showCast && <Cast cast={cast} />}
      {showReviews && <Reviews movieId={movieId} />}
    </div>
  );
};

export default MovieDetails;

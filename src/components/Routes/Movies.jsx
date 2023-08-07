import React, { useState, useEffect, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { searchMovies } from '../Api';

const Movies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = useCallback(() => {
    searchMovies(searchTerm)
      .then((movies) => {
        setSearchResults(movies);
      })
      .catch((error) => {
        console.error('Error searching movies:', error);
      });
  }, [searchTerm]);

  useEffect(() => {
    const query = searchParams.get('query');
    if (query) {
      setSearchTerm(query);
      handleSearch();
    }
  }, [searchParams, handleSearch]);

  const handleSubmitSearchTerm = (query) => {
    setSearchParams({ query: query });
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={() => handleSubmitSearchTerm(searchTerm)}>Search</button>
      {searchResults.length > 0 && (
        <div>
          <h2>Search Results</h2>
          <ul>
            {searchResults.map((movie) => (
              <li key={movie.id}>
                <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Movies;

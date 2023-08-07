
import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { searchMovies } from '../Api';

const Movies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  React.useEffect(() => {
    const query = searchParams.get('query');
    if (query) {
      setSearchTerm(query);
      handleSearch(query); 
    }
  }, [searchParams]);

  const handleSearch = (query) => {
    searchMovies(query)
      .then((movies) => {
        setSearchResults(movies);
        setSearchParams({ query }); 
      })
      .catch((error) => {
        console.error('Error searching movies:', error);
      });
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchTerm); 
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
      </form>
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

import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { searchMovies } from '../Api';

const Movies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams(); // Get the search parameters

  const handleSearch = () => {
    searchMovies(searchTerm)
      .then((movies) => {
        setSearchResults(movies);
        // Update the URL with the search query as a parameter
        setSearchParams({ query: searchTerm });
      })
      .catch((error) => {
        console.error('Error searching movies:', error);
      });
  };

  // Update the search term from the URL parameter on component mount
  React.useEffect(() => {
    const query = searchParams.get('query');
    if (query) {
      setSearchTerm(query);
    }
  }, [searchParams]);

  return (
    <div>
      <h1>Search Movies</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

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

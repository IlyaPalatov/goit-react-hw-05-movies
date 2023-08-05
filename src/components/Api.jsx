import axios from 'axios';

const API_KEY = '972977f56f8bd7231d09e6b66c83a88b'; 

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: API_KEY,
  },
});

export const getTrendingMovies = async () => {
  try {
    const response = await api.get('/trending/movie/week'); 
    return response.data.results;
  } catch (error) {
    throw new Error('Error fetching trending movies: ' + error.message);
  }
};

export const searchMovies = async (searchTerm) => {
  try {
    const response = await api.get('/search/movie', {
      params: {
        query: searchTerm,
      },
    });
    return response.data.results;
  } catch (error) {
    throw new Error('Error searching movies: ' + error.message);
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching movie details: ' + error.message);
  }
};

export const getMovieCredits = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}/credits`);
    return response.data.cast;
  } catch (error) {
    throw new Error('Error fetching movie credits: ' + error.message);
  }
};

export const getMovieReviews = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}/reviews`);
    return response.data.results;
  } catch (error) {
    throw new Error('Error fetching movie reviews: ' + error.message);
  }
};

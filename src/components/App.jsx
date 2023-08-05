
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';

const Home = React.lazy(() => import('./Routes/Home'));
const Movies = React.lazy(() => import('./Routes/Movies'));
const MovieDetails = React.lazy(() => import('./Routes/MovieDetails'));
const Cast = React.lazy(() => import('./Routes/Cast'));
const Reviews = React.lazy(() => import('./Routes/Reviews'));

function App() {
  return (
    <Router>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import { fetchPopularMovies } from '../service/movieService';
import MovieList from '../components/MovieList';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      const movies = await fetchPopularMovies();
      setMovies(movies);
      setLoading(false);
    };

    loadMovies();
  }, []);


  return (
    <div className="container mx-auto p-4">
    {loading ? (
      <p>Loading movies...</p>
    ) : (
      <MovieList movies={movies} />
    )}
  </div>
  );
};

export default Home;

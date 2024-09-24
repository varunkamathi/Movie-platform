import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../services/movieService';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovieDetails = async () => {
      const movie = await fetchMovieDetails(id);
      setMovie(movie);
      setLoading(false);
    };

    loadMovieDetails();
  }, [id]);

  if (loading) {
    return <div>Loading movie details...</div>;
  }

  if (!movie) {
    return <div>Movie not found!</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-1/3 object-cover"
        />
        <div className="p-4">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="text-gray-600">{movie.release_date}</p>
          <p className="mt-4">{movie.overview}</p>
          <p className="mt-4">Rating: {movie.vote_average}/10</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;

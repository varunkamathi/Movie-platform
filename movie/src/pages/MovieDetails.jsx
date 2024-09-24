import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    // Fetch movie details by ID (using a mock object for now)
    const fetchMovieDetails = async () => {
      const movieDetail = {
        id,
        title: 'Inception',
        posterUrl: 'https://image-url',
        releaseDate: '2010',
        description: 'A thief who steals corporate secrets through the use of dream-sharing technology...',
      };
      setMovie(movieDetail);
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full md:w-1/3 object-cover"
        />
        <div className="p-4">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="text-gray-600">{movie.releaseDate}</p>
          <p className="mt-4">{movie.description}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;

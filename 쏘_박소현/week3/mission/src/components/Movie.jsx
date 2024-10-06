import { useState, useEffect } from 'react';
import { getMovies } from '../api/movies/getMovies';

const baseUrl = 'https://image.tmdb.org/t/p/w500';

const Movie = () => {
  const [hoveredMovieId, setHoveredMovieId] = useState(null); 
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMovies(); 
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '10px' }}>
      {movies.map(movie => (
        <div
          key={movie.id}
          onMouseEnter={() => setHoveredMovieId(movie.id)} 
          onMouseLeave={() => setHoveredMovieId(null)} 
          style={{ position: 'relative', overflow: 'hidden' }}
        >
          <img
            src={`${baseUrl}${movie.poster_path}`}
            alt={movie.title}
            style={{
              width: '100%',
              borderRadius: '5px'
            }}
          />
          {hoveredMovieId === movie.id && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Movie;

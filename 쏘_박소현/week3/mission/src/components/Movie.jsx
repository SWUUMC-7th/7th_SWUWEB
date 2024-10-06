import { useState, useEffect } from 'react';
import { getMovies } from '../api/movies/getMovies';
import styled from 'styled-components';

const baseUrl = 'https://image.tmdb.org/t/p/w500';

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 10px;
`;

const MovieItem = styled.div`
  position: relative;
  overflow: hidden;

  &:hover div {
    opacity: 1;
  }
`;

const MovieImage = styled.img`
  width: 100%;
  border-radius: 5px;
`;

const HoverOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0; 
  transition: opacity 0.3s ease; 
`;

const Movie = () => {
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
    <MovieGrid>
      {movies.map(movie => (
        <div key={movie.id}>
          <MovieItem key={movie.id}>
          <MovieImage
            src={`${baseUrl}${movie.poster_path}`}
            alt={movie.title}
          />
          <HoverOverlay /> 
        </MovieItem>
        <p>{movie.title}</p>
        <p>{movie.release_date}</p>
        </div>
      ))}
    </MovieGrid>
  );
};

export default Movie;

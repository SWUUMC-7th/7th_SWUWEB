import { useState, useEffect } from 'react';
import { getMovies } from '../api/movies/getMovies';
import styled from 'styled-components';

const baseUrl = 'https://image.tmdb.org/t/p/w500';

const MovieContainer = styled.div`
  display: flex;
  flex-wrap: wrap; 
  gap: 10px;
  justify-content: center;
`;

const MovieItem = styled.div`
  position: relative;
  overflow: hidden;
  width: 160px;

  &:hover img {
    filter: brightness(20%); 
  }
`;

const MovieImage = styled.img`
  width: 100px;
  border-radius: 5px;
  transition: filter 0.3s ease; 
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
    <MovieContainer>
      {movies.map(movie => (
        <MovieItem key={movie.id}>
          <MovieImage
            src={`${baseUrl}${movie.poster_path}`}
            alt={movie.title}
          />
          <p>{movie.title}</p>
          <p>{movie.release_date}</p>
        </MovieItem>
      ))}
    </MovieContainer>
  );
};

export default Movie;

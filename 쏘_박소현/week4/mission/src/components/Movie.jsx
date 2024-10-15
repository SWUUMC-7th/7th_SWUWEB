import { useState, useEffect } from 'react';
import { getMovies } from '../api/movies/getMovies';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const baseUrl = 'https://image.tmdb.org/t/p/w500';

const MovieContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); 
  gap: 10px;
  margin: 0 auto;
  max-width: 1300px; 
`;

const MovieItem = styled.div`
  position: relative;
  overflow: hidden;

  &:hover img {
    filter: brightness(20%); 
  }
`;

const MovieImage = styled.img`
  width: 100%;
  border-radius: 5px;
  transition: filter 0.3s ease; 
`;

const Movie = () => {
  const { category } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMovies(category);
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [category]);

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

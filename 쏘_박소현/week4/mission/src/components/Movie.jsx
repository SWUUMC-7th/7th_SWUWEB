import { useParams , useNavigate } from 'react-router-dom';
import useMovie from '../hooks/useMovie';
import styled from 'styled-components';

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

const LoadingMessage = styled.p`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
`;

const ErrorMessage = styled.p`
  text-align: center;
  color: red;
  font-size: 18px;
  font-weight: bold;
`;

const Movie = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const { data: movies, isLoading, isError } = useMovie(category);

  const handleMovieClick = (movieId) => {
    navigate(`/movies/${movieId}`);
  };

  if (isLoading) {
    return <LoadingMessage>Loading movies...</LoadingMessage>;
  }

  if (isError) {
    return <ErrorMessage>Failed to load movies. Please try again later.</ErrorMessage>;
  }

  return (
    <MovieContainer>
      {movies.map(movie => (
        <MovieItem key={movie.id} onClick={() => handleMovieClick(movie.id)}>
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

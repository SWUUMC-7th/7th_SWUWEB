import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const baseUrl = "https://image.tmdb.org/t/p/w500";

const MovieItem = styled.div`
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &:hover img {
    filter: brightness(20%);
  }
`;

const MovieImage = styled.img`
  width: 100%;
  border-radius: 5px;
  transition: filter 0.3s ease;
`;

interface MovieProps {
  movie: {
    id: number;
    title: string;
    release_date: string;
    poster_path: string;
  };
}

const Movie: React.FC<MovieProps> = ({ movie }) => {
  const navigate = useNavigate();

  const handleMovieClick = () => {
    navigate(`/movies/${movie.id}`);
  };

  return (
    <MovieItem onClick={handleMovieClick}>
      <MovieImage src={`${baseUrl}${movie.poster_path}`} alt={movie.title} />
      <p>{movie.title}</p>
      <p>{movie.release_date}</p>
    </MovieItem>
  );
};

export default Movie;

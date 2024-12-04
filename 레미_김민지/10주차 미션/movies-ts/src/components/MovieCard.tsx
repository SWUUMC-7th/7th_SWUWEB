import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    poster_path: string | null;
    release_date: string;
  };
  isLoading: boolean;
}

const MovieCards: React.FC<MovieCardProps> = ({ movie, isLoading }) => {
  const navigate = useNavigate();
  const [hoveredMovieId, setHoveredMovieId] = useState<number | null>(null);

  const handleMouseEnter = (id: number) => {
    setHoveredMovieId(id);
  };

  const handleMouseLeave = () => {
    setHoveredMovieId(null);
  };

  const handleClick = () => {
    navigate(`/movies/${movie.id}`);
  };

  if (isLoading) {
    return <SkeletonCard />;
  }

  return (
    <MovieCard
      onMouseEnter={() => handleMouseEnter(movie.id)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {movie.poster_path ? (
        <PosterImage
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      ) : (
        <Placeholder>No Image</Placeholder>
      )}
      {hoveredMovieId === movie.id && (
        <HoverInfo>
          <HoverText bold>{movie.title}</HoverText>
          <HoverText>{movie.release_date}</HoverText>
        </HoverInfo>
      )}
    </MovieCard>
  );
};

export default MovieCards;

const CARD_WIDTH = 200;
const CARD_HEIGHT = 300;
const CARD_RADIUS = 8;

const MovieCard = styled.div`
  position: relative;
  width: ${CARD_WIDTH}px;
  height: ${CARD_HEIGHT}px;
  border-radius: ${CARD_RADIUS}px;
  overflow: hidden;
  cursor: pointer;
`;

const PosterImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: ${CARD_RADIUS}px;
`;

const Placeholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #333;
  color: #fff;
  font-size: 14px;
  text-align: center;
  border-radius: ${CARD_RADIUS}px;
`;

const HoverInfo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
`;

const HoverText = styled.div<{ bold?: boolean }>`
  text-align: center;
  color: #fff;
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
`;

const loading = keyframes`
  0% {
    background-color: #e0e0e0;
  }
  50% {
    background-color: #c0c0c0;
  }
  100% {
    background-color: #e0e0e0;
  }
`;

const SkeletonCard = styled.div`
  width: ${CARD_WIDTH}px;
  height: ${CARD_HEIGHT}px;
  border-radius: ${CARD_RADIUS}px;
  animation: ${loading} 1.5s infinite;
`;

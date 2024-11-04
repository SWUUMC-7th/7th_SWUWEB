import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function MovieCards({ movie }) {
  const navigate = useNavigate();
  const [hoveredMovieId, setHoveredMovieId] = useState(null);

  const handleMouseEnter = (id) => {
    setHoveredMovieId(id);
  };

  const handleMouseLeave = () => {
    setHoveredMovieId(null);
  };

  const handleClick = () => {
    navigate(`/movies/${movie.id}`);
  };

  return (
    <MovieCard
      onMouseEnter={() => handleMouseEnter(movie.id)}
      onMouseLeave={handleMouseLeave}
      onClick={() => handleClick()}
    >
      <PosterImage src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      {hoveredMovieId === movie.id && (
        <HoverInfo>
          <HoverText bold>{movie.title}</HoverText>
          <HoverText>{movie.release_date}</HoverText>
        </HoverInfo>
      )}
    </MovieCard>
  );
}

export default MovieCards;

const MovieCard = styled.div`
  position: relative;
  width: 170px;
  height: 260px;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
`;

const PosterImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
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

const HoverText = styled.div`
  text-align: center;
  color: #fff;
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
`;

import { useParams } from "react-router-dom";
import Movie from "../components/Movie.jsx";
import styled from "styled-components";
import useMovie from "../hooks/useMovie.js";

const Container = styled.div`
  margin: 30px auto;
`;

const MovieContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 10px;
  margin: 0 auto;
  max-width: 1300px;
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

const MoviesPage = () => {
  const { category } = useParams();
  const { data: movies, isLoading, isError } = useMovie(category);

  if (isLoading) {
    return <LoadingMessage>Loading movies...</LoadingMessage>;
  }

  if (isError) {
    return (
      <ErrorMessage>
        Failed to load movies. Please try again later.
      </ErrorMessage>
    );
  }

  return (
    <Container>
      <MovieContainer>
        {movies.map((movie) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </MovieContainer>
    </Container>
  );
};

export default MoviesPage;

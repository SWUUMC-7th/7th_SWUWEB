import { useParams } from "react-router-dom";
import Movie from "../components/Movie";
import styled from "styled-components";
import useMovie from "../hooks/useMovie";
import { CircularProgress } from "@mui/material";
import { useState } from "react";

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

const ErrorMessage = styled.p`
  text-align: center;
  color: red;
  font-size: 18px;
  font-weight: bold;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 10px;
`;

const PaginationButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background-color: #e0e0e0;
    color: #666;
    cursor: not-allowed;
  }
`;

const MoviesPage = () => {
  const { category } = useParams();
  const [page, setPage] = useState(1);

  const { movieList, isLoading, isError } = useMovie(category, null, page);

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePreviousPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1));

  if (isLoading) {
    return (
      <Container>
        <CircularProgress style={{ display: "block", margin: "20px auto" }} />
      </Container>
    );
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
        {movieList.map((movie) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </MovieContainer>
      <PaginationContainer>
        <PaginationButton onClick={handlePreviousPage} disabled={page === 1}>
          {"< 이전 "}
        </PaginationButton>
        <p>{page}</p>
        <PaginationButton onClick={handleNextPage}>
          {"다음 >"}
        </PaginationButton>
      </PaginationContainer>
    </Container>
  );
};

export default MoviesPage;

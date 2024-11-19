import { MovieGrid } from "../layout/movieGrid";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import MovieCards from "../components/movieCards";
import LoadingBar from "../components/loadingBar";
import { useGetInfiniteMovies } from "../hooks/queries/useGetInfiniteMovies";
import Error from "../components/error";
import { useGetMovies } from "../hooks/queries/useGetMovies";
import { useQuery } from "@tanstack/react-query";

const PopularMovies = () => {
  const [page, setPage] = useState(1);

  const {
    data: movies,
    isFetching,
    isError,
  } = useQuery({
    queryFn: () => useGetMovies({ category: "popular", pageParam: page }),
    queryKey: ["movies", "popular", page],
    keepPreviousData: true,
    staleTime: 10000,
  });
  console.log(movies);

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePreviousPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1));

  if (isError) {
    return <Error text="영화 불러오는데 오류가 일어났습니다." />;
  }

  return (
    <div>
      <h1>인기있는 영화</h1>
      <MovieGrid>
        {movies?.results.map((movie) => (
          <MovieCards key={movie.id} movie={movie} />
        ))}
      </MovieGrid>

      {isFetching && (
        <SkeletonWrapper>
          {[...Array(5)].map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </SkeletonWrapper>
      )}

      {/* Pagination Controls */}
      <PaginationControls>
        <PaginationButton onClick={handlePreviousPage} disabled={page === 1}>
          Previous
        </PaginationButton>
        <PageIndicator>Page {page}</PageIndicator>
        <PaginationButton onClick={handleNextPage} disabled={!movies?.results.length}>
          Next
        </PaginationButton>
      </PaginationControls>
    </div>
  );
};

// Styling for pagination controls and buttons
const PaginationControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  padding: 8px 16px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #ff3434;
  color: white;

  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
    color: #888;
  }
`;

const PageIndicator = styled.span`
  font-size: 16px;
  color: #555;
`;

const SkeletonWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

const SkeletonCard = styled.div`
  width: 170px;
  height: 260px;
  border-radius: 16px;
  background-color: #ddd;
  animation: loading 1.5s infinite;
  @keyframes loading {
    0% {
      background-color: #e0e0e0;
    }
    50% {
      background-color: #c0c0c0;
    }
    100% {
      background-color: #e0e0e0;
    }
  }
`;

export default PopularMovies;

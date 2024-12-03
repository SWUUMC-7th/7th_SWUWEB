import { useEffect } from "react";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import { useGetInfiniteMovies } from "../api/hooks/useGetInfiniteMovies";
import MovieCard from "./MovieCard";
import { ClipLoader } from "react-spinners";

interface InfiniteMovieListProps {
  category: string;
}

const InfiniteMovieList: React.FC<InfiniteMovieListProps> = ({ category }) => {
  const { data, fetchNextPage, hasNextPage, isFetching } = useGetInfiniteMovies(category);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const movies = data?.pages.flatMap((page) => page.results) || [];

  return (
    <>
      <MovieGrid>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} isLoading={isFetching} />
        ))}
      </MovieGrid>
      {isFetching && (
        <div
          style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 40 }}
        >
          <ClipLoader color="#ff214b" size={50} />
        </div>
      )}
      <InfiniteScrollTrigger ref={ref} />
    </>
  );
};

export default InfiniteMovieList;

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

const LoadingMessage = styled.p`
  text-align: center;
  margin-top: 20px;
`;

const InfiniteScrollTrigger = styled.div`
  height: 1px;
`;

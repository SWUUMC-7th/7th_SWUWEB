import { useEffect } from "react";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import { useGetInfiniteMovies } from "../api/hooks/useGetInfiniteMovies";
import { Error, LoadingBar, MovieCard, SkeletonList } from "../components/_index";

const UpcomingMovies: React.FC = () => {
  const {
    data: movies,
    isFetching,
    isPending,
    hasNextPage,
    fetchNextPage,
    isError,
  } = useGetInfiniteMovies("upcoming");

  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  if (isPending) return <SkeletonList count={6} />;

  if (isError) return <Error text="영화 불러오는데 오류가 발생했습니다." />;

  return (
    <>
      <h1 style={{ marginBottom: 20 }}>개봉 예정 영화</h1>
      <MovieGrid>
        {movies?.pages.flatMap((page) =>
          page.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} isLoading={isPending} />
          )),
        )}
      </MovieGrid>
      {isFetching && <SkeletonList count={5} />}
      <div ref={ref}>{isFetching && <LoadingBar text="영화를 불러오는 중입니다 ..." />}</div>
    </>
  );
};

export default UpcomingMovies;

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

import { MovieGrid } from "../layout/movieGrid";
import MovieCards from "../components/movieCards";
import LoadingBar from "../components/loadingBar";
import styled from "styled-components";
import { useGetInfiniteMovies } from "../hooks/queries/useGetInfiniteMovies";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Error from "../components/error";

const NowPlayingMovies = () => {
  // const {
  //   data: movies,
  //   isPending,
  //   isError,
  // } = useQuery({
  //   queryFn: () => useGetMovies({ category: "now_playing", pageParam: 1 }),
  //   queryKey: ["movies", "now_playing"],
  //   cacheTime: 10000, // 10 seconds
  //   staleTime: 10000,
  // });

  const {
    data: movies,
    isFetching,
    isPending,
    hasNextPage,
    fetchNextPage,
    isError,
  } = useGetInfiniteMovies("now_playing");
  console.log(movies);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isPending) {
    return (
      <SkeletonWrapper>
        {[...Array(7)].map((_, idx) => (
          <SkeletonCard key={idx} />
        ))}
      </SkeletonWrapper>
    );
  }

  if (isError) {
    return <Error text="영화 불러오는데 오류가 일어났습니다." />;
  }

  return (
    <>
      <h1>현재 상영중인 영화</h1>
      <MovieGrid>
        {movies?.pages.map((page) => {
          return page.results.map((movie) => {
            return <MovieCards key={movie.id} movie={movie} />;
          });
        })}
      </MovieGrid>
      {isFetching && (
        <SkeletonWrapper>
          {[...Array(5)].map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </SkeletonWrapper>
      )}
      <div ref={ref}>{isFetching && <LoadingBar text="영화를 불러오는 중입니다 ..." />}</div>
    </>
  );
};

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

export default NowPlayingMovies;

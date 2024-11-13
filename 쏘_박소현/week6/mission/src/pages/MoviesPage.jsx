import { useParams } from "react-router-dom";
import Movie from "../components/Movie";
import styled from "styled-components";
import useMovie from "../hooks/useMovie";
import { CircularProgress } from "@mui/material";
import { useRef, useCallback, useEffect } from "react";

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

const SkeletonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 10px;
  max-width: 1300px;
  margin: 0 auto;
`;

const Skeleton = styled.div`
  width: 160px;
  height: 240px;
  background-color: #e0e0e0;
  border-radius: 8px;
  animation: pulse 1.5s ease-in-out infinite;

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
    100% {
      opacity: 1;
    }
  }
`;

const MoviesPage = () => {
  const { category } = useParams();
  const { movieList, isLoading, isError, fetchNextPage, hasNextPage } =
    useMovie(category);

  const loadMoreRef = useRef(null);

  const loadMoreCallback = useCallback(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage]
  );

  useEffect(() => {
    const currentElement = loadMoreRef.current;
    const observer = new IntersectionObserver(loadMoreCallback, {
      rootMargin: "100px", // 100px before the element reaches the bottom
    });

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [loadMoreCallback]);

  if (isLoading) {
    return (
      <Container>
        <SkeletonContainer>
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} />
          ))}
        </SkeletonContainer>
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
      {hasNextPage && (
        <div ref={loadMoreRef} style={{ height: "20px", width: "100%" }} />
      )}
    </Container>
  );
};

export default MoviesPage;

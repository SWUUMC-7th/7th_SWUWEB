import { useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import MovieCards from "../components/movieCards";
import useDebounce from "../hooks/useDebounce.js";
import useCustomFetch from "../hooks/useCustomFetch.js";

const Search = () => {
  const location = useLocation();
  const [query, setQuery] = useState(new URLSearchParams(location.search).get("query") || "");
  const debouncedQuery = useDebounce(query);

  const {
    data: movies,
    isLoading,
    isError,
  } = useCustomFetch(
    `/search/movie?query=${debouncedQuery}&include_adult=false&language=en-US&page=1`,
  );
  //const movies = responseData.data.results;
  console.log("검색어:", debouncedQuery); // 검색어 확인
  console.log("영화 데이터:", movies); // 응답 데이터 확인

  return (
    <Container>
      <SearchInput
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="영화 제목을 입력하세요..."
      />
      {isLoading ? (
        <SkeletonWrapper>
          {[...Array(5)].map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </SkeletonWrapper>
      ) : isError ? (
        <Message>영화 데이터를 불러오는 중 오류가 발생했습니다.</Message>
      ) : movies.length ? (
        <MovieGrid>
          {movies.map((movie) => (
            <MovieCards key={movie.id} movie={movie} isLoading={false} />
          ))}
        </MovieGrid>
      ) : debouncedQuery ? (
        <Message>검색 결과가 없습니다.</Message>
      ) : (
        <Message>영화 제목을 검색해보세요.</Message>
      )}
    </Container>
  );
};

export default Search;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const SearchInput = styled.input`
  width: 80%;
  padding: 12px;
  margin: 20px 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
`;

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  width: 100%;
  max-width: 1200px;
`;

const Message = styled.p`
  font-size: 18px;
  color: #888;
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

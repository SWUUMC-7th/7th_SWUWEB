import { useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
import useCustomFetch from "../hooks/useCustomFetch";
import { MovieCard, SkeletonList } from "../components/_index";

const Search: React.FC = () => {
  const location = useLocation();
  const [query, setQuery] = useState<string>(
    new URLSearchParams(location.search).get("query") || "",
  );
  const debouncedQuery = useDebounce(query);

  const {
    data: movies,
    isLoading,
    isError,
  } = useCustomFetch(
    `/search/movie?query=${debouncedQuery}&include_adult=false&language=en-US&page=1`,
  );

  return (
    <Container>
      <SearchInput
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="영화 제목을 입력하세요..."
      />
      {isLoading && <SkeletonList count={5} />}
      {isError && <Message>영화 데이터를 불러오는 중 오류가 발생했습니다.</Message>}
      {!isLoading && !isError && (
        <>
          {movies.length > 0 ? (
            <MovieGrid>
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} isLoading={isLoading} />
              ))}
            </MovieGrid>
          ) : debouncedQuery ? (
            <Message>검색 결과가 없습니다.</Message>
          ) : (
            <Message>영화 제목을 검색해보세요.</Message>
          )}
        </>
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

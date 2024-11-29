import styled from "styled-components";
import { useEffect, useState } from "react";
import useCustomFetch from "../../hooks/useCustomFetch";
import MovieCard from "../components/moviecard";
import Skeleton from "../components/skeleton";
import { debounce } from "../../utils/debounce";

const Container = styled.div`
  background-color: black;
  width: calc(100vw - 200px);
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap:5px;
`;
const Input = styled.input`
  width: 500px;
  height: 40px;
`;
const SearchBtn = styled.button`
  background-color: #f2075d;
  color: white;
`;
const Movie = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: 10px;
  padding-left: 25px;
  gap: 10px;
  overflow-y: auto;
`;
const NoMovie = styled.div`
  font-size: 30px;
  font-weight: 600;
  color: white;
  margin: 10% auto;
`;

const Search = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isSearched, setIsSearched] = useState(false);
  const { data, isLoading } = useCustomFetch(
    `/search/movie?query=${searchValue}&language=ko-KR`
  );

  const debouncedSearch = debounce(() => {
    if (searchValue) {
      setIsSearched(true); 
    } else {
      setIsSearched(false); 
    }
  }, 500);

  const handleSearch = (e) => {
    setSearchValue(e.target.value); 
  };

  useEffect(() => {
    debouncedSearch();
  }, [searchValue,debouncedSearch]); 

  
  useEffect(() => {
    if (data) {
      setMovies(data);
    }
  }, [data]); 

  return (
    <Container>
      <Wrapper>
        <Input
          placeholder="영화 제목을 입력하세요."
          value={searchValue}
          onChange={handleSearch} 
        />
        <SearchBtn onClick={handleSearch}>검색</SearchBtn>
      </Wrapper>
      <Movie>
        {isLoading &&
          Array.from({ length: 20 }).map((_, index) => (
            <Skeleton key={index} />
          ))}
        {!isLoading &&
          movies.length > 0 &&
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        {isSearched && movies.length === 0 && searchValue && (
          <NoMovie>{`검색하신 "${searchValue}"에 해당하는 영화가 없습니다.`}</NoMovie>
        )}
      </Movie>
    </Container>
  );
};

export default Search;
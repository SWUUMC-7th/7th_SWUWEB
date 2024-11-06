import { useState } from "react";
import styled from "styled-components";
import { getSearch } from "../api/movies/getSearch";
import Movie from "../components/Movie"; 

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 500px;
`;

const Button = styled.button`
  background-color: #ff3557; 
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const MoviesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const SearchPage = () => {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSearch = async () => {
    if (!search) return; 

    try {
      const data = await getSearch(search); 
      setMovies(data.results); 
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
    }
  };

  return (
    <Container>
      <InputContainer>
        <Input
          type="text"
          placeholder="영화 제목을 입력하세요."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={handleSearch}>검색</Button>
      </InputContainer>

      <MoviesContainer>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Movie key={movie.id} movie={movie} />
          ))
        ) : (
          <p>영화를 찾을 수 없습니다.</p>
        )}
      </MoviesContainer>
    </Container>
  );
};

export default SearchPage;

import { useEffect, useState } from "react";
import styled from "styled-components";
import { getSearch } from "../api/movies/getSearch";
import Movie from "../components/Movie";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 10px;
  margin: 0 auto;
  max-width: 1300px;
`;

const SkeletonMovie = styled.div`
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

interface MovieData {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
}

interface SearchResponse {
  results: MovieData[];
}

const SearchPage: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    if (!search) return;

    setLoading(true);
    setIsSearched(false);
    setMovies([]);

    try {
      const data: SearchResponse = await getSearch(search);
      setMovies(data.results);
      setIsSearched(true);
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (search) {
        handleSearch();
      }
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [search]);

  return (
    <Container>
      <InputContainer>
        <Input
          type="text"
          placeholder="영화 제목을 입력하세요."
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
        />
        <Button onClick={handleSearch}>검색</Button>
      </InputContainer>

      {loading ? (
        <MoviesContainer>
          {Array.from({ length: movies.length || 10 }).map((_, index) => (
            <SkeletonMovie key={index} />
          ))}
        </MoviesContainer>
      ) : movies.length > 0 ? (
        <MoviesContainer>
          {movies.map((movie) => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </MoviesContainer>
      ) : (
        isSearched && <h2>영화를 찾을 수 없습니다.</h2>
      )}
    </Container>
  );
};

export default SearchPage;

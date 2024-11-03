import styled from "styled-components";
import { useState } from "react";
import useCustomFetch from "../../hooks/useCustomFetch";
import LoadingSpinner from "../components/loadingSpinner";
import MovieFetchError from "../components/movieFetchError";
import MovieCard from "../components/moviecard";
const Container=styled.div`
    background-color:black;
    width:calc(100vw - 200px);
`;
const Wrapper=styled.div`
    display:flex;
    justify-content:center;
`;
const Input=styled.input`
    width:500px;
    height:40px;
`;
const SearchBtn=styled.button`
    background-color:#F2075D;
    color:white;
`;
const Movie=styled.div`
    display:flex;
    flex-wrap:wrap;
    padding-top:10px;
    padding-left:25px;
    gap:10px;
    overflow-y:auto;
`;
const Search = () => {
    const [movies, setMovies] = useState([]);
    const [searchValue,setSearchValue]=useState("");
    const {data, isLoading, isError} = useCustomFetch(`/search/movie?query=${searchValue}&language=ko-KR`);
    
    const handleSearch=()=>{
        if (data) {
            setMovies(data); 
            console.log(data);
        }
    }

    if(isLoading){
        return <LoadingSpinner/>
    }
    if(isError){
        return <MovieFetchError/>
    }
    return (
        <Container>
            <Wrapper>
                <Input 
                    placeholder="영화 제목을 입력하세요."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <SearchBtn onClick={handleSearch}>검색</SearchBtn>
            </Wrapper>
            <Movie>
                {movies.map((movie) => (
                    <MovieCard 
                        key={movie.id} 
                        movie={movie}
                    />
                ))}
            </Movie>
        </Container>
    );
};

export default Search;
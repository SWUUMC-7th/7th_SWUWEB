import Movie from "../components/Movie.jsx";
import styled from "styled-components";

const Container = styled.div`
  margin: 30px auto;
`;



const MoviesPage = () => {

    return (
      <Container>
        <Movie />
      </Container>
    )
};

export default MoviesPage;



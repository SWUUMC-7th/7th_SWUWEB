import { useParams } from 'react-router-dom';
import useMovie from '../hooks/useMovie'; 
import styled from 'styled-components';

const Container = styled.div`
  margin: 50px;
  padding: 20px;
  display: flex;
  gap: 30px;
  flex-direction: row;
  align-items: center;
`;

const Poster = styled.img`
  width: 300px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 20px 0;
  text-align: start;
`;

const InfoContainer = styled.div`
  display: flex;
  gap: 20px;
  text-align: center;
`;

const InfoItem = styled.p`
  font-size: 1.1rem;
  color: #b6b6b6;
  margin: 5px 0;
`;

const Description = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  margin: 10px 0;
  text-align: start;
`;

const DetailPage = () => {
  const { movieId } = useParams();
  const { movie, isLoading, isError } = useMovie(null, movieId);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading movie details.</p>;
  }

  return (
    <Container>
      {movie && (
        <>
          <Poster src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <div>
            <Title>{movie.title}</Title>
            <InfoContainer>
              <InfoItem>{movie.release_date}</InfoItem>
              <InfoItem>{movie.vote_average}/10</InfoItem>
              <InfoItem>{movie.runtime}분</InfoItem>
            </InfoContainer>
            <Description>{movie.overview}</Description>
          </div>
        </>
      )}
    </Container>
  );
};

export default DetailPage;
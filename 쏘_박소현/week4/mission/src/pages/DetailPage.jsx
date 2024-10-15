import { useParams } from 'react-router-dom';
import useMovie from '../hooks/useMovie';
import styled from 'styled-components';

const Container = styled.div`
  margin: 50px;
  padding: 20px;
  gap: 30px;
  flex-direction: row;
  align-items: center;
`;

const DetailContainer = styled.div`
  display: flex;
  gap: 30px;
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

const CreditsContainer = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 20px;
  flex-direction: row;
  flex-wrap: wrap;
`;

const CreditItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0;
  flex: 0 0 calc(100% / 12);
`;

const CreditImage = styled.img`
  width: 75px;
  height: 75px;
  border-radius: 50%;
  margin-bottom: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const DefaultImage = styled.div`
  width: 75px;
  height: 75px;
  border-radius: 50%;
  background-color: #d3d3d3;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const CreditName = styled.p`
  font-size: 0.9rem;
  margin: 0;
  text-align: center;
`;

const DetailPage = () => {
  const { movieId } = useParams();
  const { movie, credits, isLoading, isError } = useMovie(null, movieId);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading movie details.</p>;
  }

  if (!movie) {
    return <p>No movie found.</p>;
  }

  const director = credits.crew?.find(person => person.job === 'Director');
  const cast = credits.cast || [];

  return (
    <>
      <Container>
        <DetailContainer>
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
        </DetailContainer>
        <div>
        <h3>감독/출연</h3>
      <CreditsContainer>
        {[director, ...cast].map(person => (
          <CreditItem key={person.id || person.name}> 
            {person.profile_path ? (
              <CreditImage src={`https://image.tmdb.org/t/p/w500${person.profile_path}`} alt={person.name} />
            ) : (
              <DefaultImage>
                <span>{person.name.charAt(0)}</span>
              </DefaultImage>
            )}
            <CreditName>{person.name}</CreditName>
          </CreditItem>
        ))}
      </CreditsContainer>  
      </div>
      </Container>
      
    </>
  );
};

export default DetailPage;

import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Error, LoadingBar } from "../components/_index";
import { useGetMovieDetails } from "../api/hooks/useGetMovieDetails";
import { useGetMovieCredits } from "../api/hooks/useGetMovieCredits";

const MovieDetail: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const { data: movieData, isLoading, isError } = useGetMovieDetails(movieId);
  const { data: credits, isLoading: isCreditsLoading } = useGetMovieCredits(movieId);

  if (isLoading || isCreditsLoading) return <LoadingBar text="정보 불러오는 중..." />;
  if (isError || !movieData) return <Error text="영화 정보를 가져오는 데 실패했습니다." />;

  const genres = movieData.genres || [];
  const countries = movieData.production_countries || [];
  const cast = credits?.cast || [];
  const director = credits?.crew.find((person) => person.job === "Director");

  return (
    <DetailContainer>
      {/* 상단 Hero 섹션 */}
      <HeaderSection
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movieData.backdrop_path})`,
        }}
      >
        <Overlay />
        <HeroContent>
          <MovieTitle>{movieData.title}</MovieTitle>
          <MovieDetailsRow>
            <MovieYear>{movieData.release_date}</MovieYear>
            <MovieRating>⭐ {movieData.vote_average}</MovieRating>
            <MovieRuntime>{movieData.runtime}분</MovieRuntime>
          </MovieDetailsRow>
          <GenresContainer>
            {genres.map((genre) => (
              <GenreTag key={genre.id}>{genre.name}</GenreTag>
            ))}
          </GenresContainer>
          <CountriesContainer>
            {countries.map((country) => (
              <CountryInfo key={country.iso_3166_1}>
                <CountryFlag
                  src={`https://flagcdn.com/16x12/${country.iso_3166_1.toLowerCase()}.png`}
                  alt={country.name}
                />
                <CountryName>{country.name}</CountryName>
              </CountryInfo>
            ))}
          </CountriesContainer>
          <MovieTagline>{movieData.tagline}</MovieTagline>
          <MovieOverview>{movieData.overview}</MovieOverview>
        </HeroContent>
      </HeaderSection>

      {/* 하단 콘텐츠 섹션 */}
      <CreditsSection>
        <CreditsTitle>감독 / 출연</CreditsTitle>
        <DirectorInfo>
          {director && (
            <>
              <DirectorLabel>감독 : </DirectorLabel>
              <DirectorName>{director.name}</DirectorName>
            </>
          )}
        </DirectorInfo>
        <CreditsGrid>
          {cast.map((person) => (
            <CreditCard key={person.id}>
              {person.profile_path ? (
                <ProfileImage
                  src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                  alt={person.name}
                />
              ) : (
                <DefaultProfile>❔</DefaultProfile>
              )}
              <PersonName>{person.name}</PersonName>
              <PersonRole>{person.character}</PersonRole>
            </CreditCard>
          ))}
        </CreditsGrid>
      </CreditsSection>
    </DetailContainer>
  );
};

export default MovieDetail;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const HeaderSection = styled.div`
  width: 100%;
  height: 70vh; /* 상단 섹션만 차지 */
  background-size: cover;
  background-position: center;
  position: relative;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.8), transparent);
`;

const HeroContent = styled.div`
  position: absolute;
  top: 20px;
  left: 40px;
  color: white;
  max-width: 600px;
`;

const MovieTitle = styled.h1`
  font-size: 48px;
  margin-bottom: 20px;
`;

const MovieDetailsRow = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const MovieYear = styled.span`
  font-size: 18px;
`;

const MovieRating = styled.span`
  font-size: 18px;
`;

const MovieRuntime = styled.span`
  font-size: 18px;
`;

const GenresContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const GenreTag = styled.div`
  background-color: #d13434;
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
`;

const CountriesContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const CountryInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CountryFlag = styled.img`
  width: 20px;
  height: 16px;
`;

const CountryName = styled.span`
  font-size: 14px;
  color: white;
`;

const MovieTagline = styled.h2`
  font-style: italic;
  margin-bottom: 20px;
`;

const MovieOverview = styled.p`
  font-size: 16px;
  line-height: 1.5;
`;

const CreditsSection = styled.div`
  padding: 40px;
  background: #121212; /* 어두운 배경 */
  color: white;
`;

const CreditsTitle = styled.h2`
  font-size: 30px;
  margin-bottom: 20px;
`;

const DirectorInfo = styled.div`
  margin-bottom: 28px;
`;

const DirectorLabel = styled.span`
  font-weight: bold;
`;

const DirectorName = styled.span`
  font-size: 18px;
  font-style: italic;
  color: #ec4444;
`;

const CreditsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
`;

const CreditCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
`;

const DefaultProfile = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: gray;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PersonName = styled.p`
  font-size: 14px;
  margin-top: 8px;
`;

const PersonRole = styled.p`
  font-size: 12px;
  color: gray;
`;

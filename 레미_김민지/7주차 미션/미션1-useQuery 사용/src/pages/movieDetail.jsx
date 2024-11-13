import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch";
import LoadingBar from "../components/loadingBar";
import Error from "../components/error";
import { useGetMovieDetails } from "../hooks/queries/useGetMovieDetails";
import { useGetMovieCredits } from "../hooks/queries/useGetMovieCredits";

const MovieDetail = () => {
  const { movieId } = useParams();
  const { data: movieData, isLoading, isError } = useGetMovieDetails(movieId);
  const { data: credits, isLoading: isCreditsLoading } = useGetMovieCredits(movieId);

  if (isLoading && isCreditsLoading) return <LoadingBar text={`정보 불러오는 중...`} />;
  if (isError) return <Error />;
  if (!movieData) return null;

  console.log(movieData);

  const genres = movieData?.genres || [];
  const countries = movieData?.production_countries || [];
  const cast = credits?.cast || [];
  const crew = credits?.crew || [];

  return (
    <>
      <DetailContainer>
        <BackgroundImage
          src={`https://image.tmdb.org/t/p/original${movieData?.backdrop_path}`}
          alt={movieData?.title}
        />
        <GradientOverlay />
        <MovieInfo>
          <MovieTitle>{movieData?.title}</MovieTitle>
          <MovieDetailsRow>
            <MovieYear>{movieData?.release_date}</MovieYear>
            <MovieRating>⭐ {movieData?.vote_average}</MovieRating>
            <MovieRuntime>{movieData?.runtime}분</MovieRuntime>
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
          <MovieTagline>{movieData?.tagline}</MovieTagline>
          <MovieOverview>{movieData?.overview}</MovieOverview>
        </MovieInfo>
      </DetailContainer>
      <CreditsSection>
        <CreditsTitle>감독 / 출연</CreditsTitle>
        <CreditsGrid>
          {cast.map((person) => (
            <CreditCard key={person.id}>
              {person.profile_path ? (
                <ProfileImage
                  src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                  alt={person.name}
                />
              ) : (
                <DefaultProfile />
              )}
              <PersonName>{person.name}</PersonName>
              <PersonRole>{person.character}</PersonRole>
            </CreditCard>
          ))}
        </CreditsGrid>
      </CreditsSection>
    </>
  );
};

export default MovieDetail;

const DetailContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.8) 40%, transparent 100%);
`;

const MovieInfo = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 620px;
  z-index: 1;
`;

const MovieTitle = styled.h1`
  font-size: 48px;
`;

const MovieDetailsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: -48px;
`;

const MovieRating = styled.p`
  font-size: 20px;
`;

const MovieYear = styled.p`
  font-size: 20px;
`;

const MovieRuntime = styled.p`
  font-size: 20px;
`;

const GenresContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  gap: 12px;
`;

const GenreTag = styled.div`
  background-color: #d13434;
  color: #ffffff;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
`;

const CountriesContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const CountryInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CountryFlag = styled.img`
  width: 20px;
  height: 16px;
  object-fit: cover;
`;

const CountryName = styled.p`
  font-size: 14px;
`;

const MovieTagline = styled.h2`
  font-style: italic;
  margin-bottom: 20px;
`;

const MovieOverview = styled.p`
  font-size: 14px;
  line-height: 2.5;
`;

const CreditsSection = styled.div`
  width: 100%;
  padding: 12px;
`;

const CreditsTitle = styled.h2`
  font-size: 30px;
`;

const CreditsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 8px;
  justify-items: center;
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
  margin-bottom: 4px;
`;

const DefaultProfile = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #777777;
  color: white;
  font-size: 2rem;
  font-weight: bold;
`;

const PersonName = styled.span`
  font-size: 16px;
`;

const PersonRole = styled.span`
  margin-bottom: 40px;
  font-size: 14px;
  color: #adacac;
`;

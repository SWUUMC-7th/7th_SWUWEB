import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../api/axios-instance";
import styled from "styled-components";

const Actors = () => {
  const {
    data: actors,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["actors"],
    queryFn: async () => {
      const response = await axiosInstance.get("/person/popular");
      return response.data.results;
    },
  });

  if (isLoading) return <Loading>Loading...</Loading>;
  if (isError) return <ErrorMessage>배우 목록을 불러오는 중 오류가 발생했습니다.</ErrorMessage>;

  return (
    <Container>
      <Title>인기 배우</Title>
      <ActorsGrid>
        {actors.map((actor) => (
          <ActorCard key={actor.id}>
            <StyledLink to={`/actors/${actor.id}`}>
              <ImageWrapper>
                <ProfileImage
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                      : "https://via.placeholder.com/150x200?text=No+Image"
                  }
                  alt={actor.name}
                />
              </ImageWrapper>
              <ActorName>{actor.name}</ActorName>
            </StyledLink>
          </ActorCard>
        ))}
      </ActorsGrid>
    </Container>
  );
};

export default Actors;

const ActorName = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
  margin: 0;
  transition: color 0.3s ease;
`;

const ActorCard = styled.div`
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.6);

    ${ActorName} {
      color: #ff214b;
    }
  }
`;

const ImageWrapper = styled.div`
  overflow: hidden;
  border-radius: 12px;
  margin-bottom: 10px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 12px;
  object-fit: cover;
`;

const Container = styled.div`
  padding: 20px;
  background-color: #141414;
  min-height: 100vh;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  font-size: 36px;
  color: #ffffff;
`;

const ActorsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Loading = styled.div`
  text-align: center;
  font-size: 18px;
  color: #ffffff;
  margin: 20px 0;
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: red;
  font-size: 18px;
  margin: 20px 0;
`;

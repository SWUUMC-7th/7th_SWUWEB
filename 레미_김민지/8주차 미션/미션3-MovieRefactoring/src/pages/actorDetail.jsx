import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../api/axios-instance";
import styled from "styled-components";

const ActorDetail = () => {
  const { actorId } = useParams();

  // 배우 정보 가져오기
  const { data: actor, isLoading: isLoadingActor } = useQuery({
    queryKey: ["actor", actorId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/person/${actorId}`);
      return response.data;
    },
  });

  // 배우 출연작 가져오기
  const { data: works, isLoading: isLoadingWorks } = useQuery({
    queryKey: ["works", actorId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/person/${actorId}/movie_credits`);
      return response.data.cast;
    },
  });

  if (isLoadingActor || isLoadingWorks) return <Loading>Loading...</Loading>;

  return (
    <Container>
      <Header>
        <BackgroundImage
          src={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
          alt={actor.name}
        />
        <Overlay />
        <Profile>
          <ProfileImage
            src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
            alt={actor.name}
          />
          <ActorInfo>
            <ActorName>{actor.name}</ActorName>
            <ActorDetails>
              <p>생년월일: {actor.birthday || "정보 없음"}</p>
              <p>직업: {actor.known_for_department}</p>
              <p>국적: {actor.place_of_birth || "정보 없음"}</p>
            </ActorDetails>
          </ActorInfo>
        </Profile>
      </Header>

      <Section>
        <SectionTitle>출연작</SectionTitle>
        <WorksGrid>
          {works.map((work) => (
            <WorkCard key={work.id}>
              <WorkPoster
                src={`https://image.tmdb.org/t/p/w500${work.poster_path}`}
                alt={work.title || work.name}
              />
              <WorkTitle>{work.title || work.name}</WorkTitle>
            </WorkCard>
          ))}
        </WorksGrid>
      </Section>
    </Container>
  );
};

export default ActorDetail;

const Container = styled.div`
  background-color: #1e1e1e;
  color: white;
  min-height: 100vh;
`;

const Header = styled.div`
  position: relative;
  height: 400px;
  margin-bottom: 40px;
`;

const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 1));
`;

const Profile = styled.div`
  display: flex;
  align-items: flex-end;
  position: absolute;
  bottom: 20px;
  left: 20px;
  z-index: 1;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid white;
  margin-right: 20px;
`;

const ActorInfo = styled.div``;

const ActorName = styled.h1`
  font-size: 36px;
  font-weight: bold;
`;

const ActorDetails = styled.div`
  p {
    font-size: 16px;
    margin: 5px 0;
  }
`;

const Section = styled.section`
  padding: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const WorksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
`;

const WorkCard = styled.div`
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }
`;

const WorkPoster = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const WorkTitle = styled.h3`
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
  color: white;
`;

const Loading = styled.div`
  text-align: center;
  font-size: 18px;
  margin: 20px 0;
`;

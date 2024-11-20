import React from "react";
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
      {/* 배우 기본 정보 */}
      <Header>
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
      </Header>

      {/* 배우 출연작 */}
      <Section>
        <SectionTitle>출연작</SectionTitle>
        <WorksGrid>
          {works.map((work) => (
            <WorkCard key={work.id}>
              <CardImageWrapper>
                <CardImage
                  src={`https://image.tmdb.org/t/p/w500${work.poster_path}`}
                  alt={work.title || work.name}
                />
              </CardImageWrapper>
              <CardOverlay>
                <CardTitle>{work.title || work.name}</CardTitle>
                <CardInfo>
                  <p>평균 ★ {work.vote_average || "N/A"}</p>
                  <p>{work.release_date || "개봉일 정보 없음"}</p>
                </CardInfo>
              </CardOverlay>
            </WorkCard>
          ))}
        </WorksGrid>
      </Section>
    </Container>
  );
};

export default ActorDetail;

// Styled Components
const Container = styled.div`
  background-color: #141414;
  color: white;
  min-height: 100vh;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
`;

const ActorInfo = styled.div`
  flex: 1;
`;

const ActorName = styled.h1`
  font-size: 36px;
  margin-bottom: 10px;
`;

const ActorDetails = styled.div`
  p {
    margin: 5px 0;
    font-size: 16px;
  }
`;

const Section = styled.section`
  margin-top: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const WorksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

const CardOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const WorkCard = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6);

    ${CardOverlay} {
      opacity: 1;
    }
  }
`;

const CardImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${WorkCard}:hover & {
    transform: scale(1.2);
    filter: blur(2px);
  }
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: bold;
`;

const CardInfo = styled.div`
  margin-top: 5px;
  font-size: 14px;
  opacity: 0.9;
`;

const Loading = styled.div`
  text-align: center;
  font-size: 18px;
  margin: 20px 0;
`;

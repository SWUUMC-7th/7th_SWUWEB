import React, { useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { useGetInfiniteMovies } from "../hooks/queries/useGetInfiniteMovies";
import { useInView } from "react-intersection-observer";
import useAuth from "../hooks/useAuth";

const categories = [
  { id: "popular", label: "인기 영화" },
  { id: "now_playing", label: "상영 중" },
  { id: "upcoming", label: "개봉 예정" },
  { id: "top_rated", label: "최고 평점" },
];

const HomePage = () => {
  const { nickname } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("popular");

  const { data, fetchNextPage, hasNextPage, isFetching } = useGetInfiniteMovies(selectedCategory);
  const { ref, inView } = useInView();

  React.useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const movies = data?.pages.flatMap((page) => page.results) || [];

  return (
    <Container>
      {nickname && <WelcomeMessage>안녕하세요, {nickname}님!</WelcomeMessage>}

      {/* 상단 배너 */}
      <SwiperWrapper>
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3000, // 슬라이드 간 전환 딜레이 (밀리초)
            disableOnInteraction: false, // 사용자가 스와이프한 후에도 자동 재생 유지
          }}
          pagination={{ clickable: true }}
        >
          {movies.slice(0, 5).map((movie) => (
            <SwiperSlide key={movie.id}>
              <BannerSlide>
                <BannerImage
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt={movie.title}
                />
                <BannerContent>
                  <h2>{movie.title}</h2>
                  <p>{movie.overview.slice(0, 100)}...</p>
                </BannerContent>
              </BannerSlide>
            </SwiperSlide>
          ))}
        </Swiper>
      </SwiperWrapper>

      {/* 카테고리 선택 탭 */}
      <CategoryTabs>
        {categories.map((category) => (
          <CategoryTab
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            isActive={selectedCategory === category.id}
          >
            {category.label}
          </CategoryTab>
        ))}
      </CategoryTabs>

      {/* 순위와 영화 카드 */}
      <Section>
        <SectionTitle>
          {categories.find((c) => c.id === selectedCategory)?.label} Top 20
        </SectionTitle>
        <MovieGrid>
          {movies.slice(0, 20).map((movie, index) => (
            <MovieCard key={movie.id}>
              <Rank>{index + 1}</Rank>
              <Poster
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <Overlay>
                <MovieTitle>{movie.title}</MovieTitle>
                <CategoryLabel>
                  {selectedCategory === "popular" ? "새로운 콘텐츠" : "추천 콘텐츠"}
                </CategoryLabel>
              </Overlay>
            </MovieCard>
          ))}
        </MovieGrid>
      </Section>

      {/* 무한 스크롤 */}
      <InfiniteScrollArea ref={ref}>
        {isFetching && <Loading>영화를 불러오는 중...</Loading>}
      </InfiniteScrollArea>
    </Container>
  );
};

export default HomePage;

// Styled Components
const Container = styled.div`
  padding: 0 20px;
  max-width: 1200px;
  margin: auto;
`;

const WelcomeMessage = styled.h2`
  text-align: center;
  margin-top: 20px;
  font-size: 24px;
  color: #ff214b;
`;

const SwiperWrapper = styled.div`
  margin-bottom: 40px;
  border-radius: 12px;
  overflow: hidden;

  .swiper-pagination-bullet {
    background: #ff214b;
  }

  .swiper-pagination-bullet-active {
    background: #ff6392;
  }
`;

const BannerSlide = styled.div`
  position: relative;
  height: 400px;
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const BannerContent = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: white;
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.7);

  h2 {
    font-size: 32px;
    margin-bottom: 10px;
  }

  p {
    font-size: 18px;
    max-width: 600px;
  }
`;

const CategoryTabs = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const CategoryTab = styled.button`
  all: unset;
  cursor: pointer;
  margin: 0 10px;
  padding: 10px 20px;
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => (props.isActive ? "#fff" : "#aaa")};
  background-color: ${(props) => (props.isActive ? "#ff214b" : "transparent")};
  border-radius: 20px;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #ff6392;
    color: #fff;
  }
`;

const Section = styled.section`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #fff;
`;

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

const MovieCard = styled.div`
  position: relative;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Rank = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  z-index: 1;
`;

const Poster = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Overlay = styled.div`
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  text-align: center;
  color: white;
  background: rgba(0, 0, 0, 0.7);
  padding: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const MovieTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const CategoryLabel = styled.span`
  font-size: 14px;
`;

const InfiniteScrollArea = styled.div`
  text-align: center;
  padding: 20px 0;
`;

const Loading = styled.p`
  font-size: 18px;
  color: #999;
`;

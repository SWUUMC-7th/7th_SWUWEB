import { useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import InfiniteMovieList from "../components/InfiniteMovieList";
import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../api/movieApi";

interface Category {
  id: string;
  label: string;
}

// 카테고리 데이터
const categories: Category[] = [
  { id: "popular", label: "인기 영화" },
  { id: "now_playing", label: "상영 중" },
  { id: "upcoming", label: "개봉 예정" },
  { id: "top_rated", label: "최고 평점" },
];

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("popular");

  const { data: bannerData, isLoading: isBannerLoading } = useQuery({
    queryKey: ["bannerMovies"],
    queryFn: () => getMovies({ category: "popular", pageParam: 1 }),
    select: (data) => data.results.slice(0, 5), // 상위 5개 영화만 선택
  });

  return (
    <Container>
      <SwiperWrapper>
        {isBannerLoading ? (
          <Loading>배너 로딩 중...</Loading>
        ) : (
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
          >
            {bannerData?.map((movie) => (
              <SwiperSlide key={movie.id}>
                <BannerSlide>
                  {movie.backdrop_path && (
                    <BannerImage
                      src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                      alt={movie.title}
                    />
                  )}
                  <HoverOverlay className="hover-overlay">
                    <h2>{movie.title}</h2>
                    <p>{movie.overview.slice(0, 200)}...</p>
                  </HoverOverlay>
                </BannerSlide>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </SwiperWrapper>
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
      <InfiniteMovieList category={selectedCategory} />
    </Container>
  );
};

export default Home;

const Container = styled.div`
  max-width: 1200px;
  margin: auto;
`;

const SwiperWrapper = styled.div`
  margin-bottom: 40px;
`;

const BannerSlide = styled.div`
  position: relative;
  height: 400px;
  overflow: hidden;

  &:hover .hover-overlay {
    opacity: 1; /* 호버 시 오버레이 활성화 */
  }
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HoverOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0));
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  color: white;

  h2 {
    font-size: 24px;
    font-weight: bold;
    margin: 0;
    text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.7);
  }

  p {
    font-size: 14px;
    margin-top: 8px;
    max-width: 700px;
    text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.7);
  }
`;

const CategoryTabs = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

interface CategoryTabProps {
  isActive: boolean;
}

const CategoryTab = styled.button<CategoryTabProps>`
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

const Loading = styled.div`
  text-align: center;
  font-size: 18px;
  color: #999;
  margin-top: 20px;
`;

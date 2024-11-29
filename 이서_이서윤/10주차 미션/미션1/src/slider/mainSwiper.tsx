import { Autoplay, Pagination} from "swiper/modules";
import { Swiper } from "swiper/react";
import styled from "styled-components";
// import "swiper/css";
// import "swiper/css/pagination";
import PropTypes from "prop-types";

const mainBannerSwiperBox = styled.div`
  position: relative;
  width: 1200px;
  height: 450px;
  .swiper-container {
    width: 100%;  /* 100% 너비로 설정 */
    height: 100%; /* 100% 높이로 설정 */
    position: relative;
  }

  .swiper-pagination {
    position: absolute;
    bottom: 20px;
    left: 50%; /* 가운데로 정렬 */
    transform: translateX(-50%); /* 정확하게 가운데로 맞추기 */
  }

  .swiper-pagination-bullet {
    width: 12px;
    height: 12px;
    margin-top: 50px;
    background: #F2075D; /* 페이지네이션 색상 설정 */
  }
`;

const S = { mainBannerSwiperBox };

const MainSwiper = ({ children }) => {
  return (
    <S.mainBannerSwiperBox>
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        speed={1000}
        pagination={{
          clickable: true,
        }}
      >
        {children}
      </Swiper>
    </S.mainBannerSwiperBox>
  );
};

MainSwiper.propTypes = {
  children: PropTypes.node.isRequired,
};

export { MainSwiper };

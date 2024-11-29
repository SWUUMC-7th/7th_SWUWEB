import { Navigation} from "swiper/modules";
import  { useRef } from "react";
import { Swiper } from "swiper/react";
import styled from "styled-components";
// import "swiper/css";
// import "swiper/css/pagination";
import PropTypes from "prop-types";

const Container=styled.div`
    display:flex;
    justify-content: space-between;
    height:300px;
`;
const Button =styled.div`
    font-size:50px;
    font-weight:700;
    line-height:300px;
`;

const SubSwiper = ({ children }) =>{
    const swiperRef = useRef(null);

    const handlePrev = () => {
    swiperRef.current?.slidePrev(); // 이전 슬라이드로 이동
    };

    const handleNext = () => {
    swiperRef.current?.slideNext(4); // 다음 슬라이드로 이동
    };

    return(
        <Container>
            <Button onClick={handlePrev}>{"<"}</Button> 
            <Swiper
                modules={[Navigation]} 
                spaceBetween={10} 
                slidesPerView={5} 
                slidesPerGroup={5}
                loop={true}
                loopAdditionalSlides={5}
                onSwiper={(swiper) => (swiperRef.current = swiper)} 
            >
                { children }   
            </Swiper>
            <Button onClick={handleNext}>{">"}</Button> 
        </Container>
    )
}

SubSwiper.propTypes = {
    children: PropTypes.node.isRequired,
  };

export default SubSwiper;
import { Navigation} from "swiper/modules";
import  { useRef } from "react";
import { Swiper } from "swiper/react";
import { Swiper as SwiperInstance} from "swiper";
import styled from "styled-components";

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

interface SubSwiperProps {
    children: React.ReactNode;
  }

const SubSwiper: React.FC<SubSwiperProps> = ({ children }) =>{
    const swiperRef = useRef<SwiperInstance|null>(null);

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

export default SubSwiper;
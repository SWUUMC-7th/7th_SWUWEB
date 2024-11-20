import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { useGetMovies } from "../../hooks/queries/useGetMovies";
import { MainSwiper } from "../slider/mainSwiper";
import { SwiperSlide } from "swiper/react";
import MainMovieCard from "../components/mainMovieCard";
import SubSwiper from "../slider/subSwiper";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  background-color: black;
  width: 1200px;
  margin: 0 auto;
  * {
    color: white;
  }
`;
const MainTitle=styled.div`
    font-size:30px;
    font-weight:600;
`;
const Img=styled.img`
    width:150px;
    height:210px;
    border-radius:10px;
`;
const SubWrapper=styled.div`
    height:300px;
    display: flex;                
    flex-direction: column;       
    justify-content: center; 
    align-items: center;      
`;

const HomePage = () => {

    const { data } = useQuery({
    queryFn: () => useGetMovies({ category: "popular", pageParam: 1 }),
    queryKey: ["movies", "popular"],
    cacheTime: 10000,
    staleTime: 10000,
    });
    const { data:subData } = useQuery({
    queryFn: () => useGetMovies({ category: "now_playing", pageParam: 1 }),
    queryKey: ["movies", "now_playing"],
    cacheTime: 10000,
    staleTime: 10000,
    });
    const src='https://image.tmdb.org/t/p/w500';
    const navigate=useNavigate();
    return (
    <Container>
        <MainTitle>인기 영화</MainTitle>
        <MainSwiper>
            {data?.results?.map((movie,index) => (
            <SwiperSlide key={movie.id}>
                <MainMovieCard id={movie.id} index={index}></MainMovieCard>
            </SwiperSlide>
            ))}
        </MainSwiper>
        <MainTitle>상영 중인 영화</MainTitle>
        <SubSwiper>
            {subData?.results?.map((movie,index) => (
                <SwiperSlide key={movie.id}>
                    <SubWrapper>
                        <Img 
                            src={`${src}${movie.poster_path}`} 
                            alt={movie.title}
                            onClick={()=>{console.log(movie.id)
                                navigate(`/movies/${movie.id}`)}}
                        />
                        <div>{index+1}</div>
                        <div>{movie.title}</div>
                    </SubWrapper>
                </SwiperSlide>
            ))}
        </SubSwiper>
    </Container>
    );
};

export default HomePage;

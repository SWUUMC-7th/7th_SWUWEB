import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { useGetMovies } from "../../hooks/queries/useGetMovies";
import { useNavigate } from "react-router-dom";

const Container=styled.div`
    width:300px;
    height:450px;
    display:flex;
`;
const Img=styled.img`
    width:700px;
    height:400px;
`;
const Wrapper=styled.div`
    margin-left:40px;
    width:600px;
    height:100px;
    line-height:100px;
`;
const Index=styled.div`
    font-size:100px;
    font-weight:800;
`;
const Title=styled.div`
    width:600px;
    font-size:35px;
    font-weight:800;
    margin-top:-20px;
`;

const MainMovieCard=({ id, index }: { id: number; index: number })=>{  
    const { data }= useQuery({
        queryFn: () => useGetMovies({ category: `${id}`, isDetail: true }),
        queryKey: ["movies", "detail", id],
        cacheTime: 10000,
        staleTime: 10000,
      });
      const navigate=useNavigate();
      const src='https://image.tmdb.org/t/p/w500';
    return(
        <Container onClick={()=>navigate(`/movies/${id}`)}>
            {data && data.backdrop_path ? (
                <Img src={`${src}${data.backdrop_path}`} alt={data.title} />
            ) : (
                <div>이미지가 없습니다.</div>
            )}    
            <Wrapper>
                <Index>{index+1}</Index>
                <Title>{data?.title}</Title>
            </Wrapper>
        </Container>
    )
}

export default MainMovieCard
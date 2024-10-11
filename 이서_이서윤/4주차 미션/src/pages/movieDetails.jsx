import { useParams } from "react-router-dom"
import useCustomFetch from "../../hooks/useCustomFetch"
import MovieFetchError from "../components/movieFetchError";
import LoadingSpinner from "../components/loadingSpinner";
import styled from "styled-components";
import { LuDot } from "react-icons/lu";

const TopWrapper = styled.div`
    display:flex;
    margin:10px 30px;
    justify-content:space-between;
    height:350px;
`;
const Info = styled.div`
    width:700px;
    color:white;
`;
const Title=styled.div`
    font-size:40px;
    font-weight:600;
`;
const SubInfo = styled.div`
    width:350px; 
    font-size:15px;
    display:flex;
    justify-content:space-between;
    margin-top:-5px;
    margin-bottom:10px;
    *{
        height:30px;
        line-height:30px;
    }
    svg{color:#F2075D; font-size:20px;}
`;
const TagLine=styled.div`
    font-size:25px;
    font-weight:600;
    margin-bottom:15px;
    color:#E5E5E5;
`;
const OverView=styled.div`
    color:#CDCDCD;
`
const Poster = styled.img`
    width:600px;
    height:300px;
`;
const Div=styled.div`
    position:absolute;
    top:70px; left:1070px;
    width:600px; height:300px;
`;
const MovieDetails = () =>{
    const params=useParams();
    console.log('movieId',params.movieId);
    const {data, isLoading, isError} = useCustomFetch(`/movie/${params.movieId}?language=ko-KR`,true)
    console.log('data:',data);
    const src='https://image.tmdb.org/t/p/w500';
    if(isLoading){
        return <LoadingSpinner/>
    }
    if(isError){
        return <MovieFetchError/>
    }

    return(
        <>  
            <TopWrapper>
                <Info>
                    <Title>{data.title}</Title>
                    <SubInfo>
                        <div>{`평점 ${data.vote_average}`}</div><LuDot />
                        <div>{data.release_date}</div><LuDot />
                        <div>{`${data.runtime}분`}</div><LuDot />
                        {data.genres && <div>{data.genres[0].name}</div>}
                    </SubInfo>
                    {data.tagline && <TagLine>{`"${data.tagline}"`}</TagLine>}
                    {data.overview ? <OverView>{data.overview}</OverView> : <OverView>줄거리 정보가 존재하지 않습니다.</OverView>}
                </Info>
                <Div/>
                <Poster src={`${src}${data.backdrop_path}`} alt={data.title}/>
            </TopWrapper>
        </>
    )
}

export default MovieDetails
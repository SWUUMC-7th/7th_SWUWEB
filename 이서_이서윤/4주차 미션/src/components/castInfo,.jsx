/* eslint-disable react/prop-types */
import styled from "styled-components";

const Container=styled.div`
    width:100px; height:100px;
    text-align:center;
    border:1px solid red;
`;
const Img=styled.img`
    width:50px; height:50px;
    border-radius:30px;
`;
const Name=styled.div`

`;
const CastInfo = ({cast}) =>{
    const src='https://image.tmdb.org/t/p/w500';
    return(
        <Container>
            <Img src={`${src}${cast.profile_path}`} alt={cast.name}/>
            <Name>{cast.name}</Name>
        </Container>
    )
}
export default CastInfo;
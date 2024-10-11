/* eslint-disable react/prop-types */
import styled from "styled-components";
import userDefault from "../assets/userDefault.png";

const Container=styled.div`
    width:150px; height:180px;
    text-align:center;
    padding-top:5px;
`;
const Img=styled.img`
    width:100px; height:100px;
    border-radius:50%;
    border:2px solid ${({isCrew})=>(isCrew ? '#F2075D' : 'white')}; 
`;
const Name=styled.div`
    color:white;
    font-weight:700;
`;
const Character=styled.div`
    color:#CDCDCD;
    font-size:14px;
`;
const CastInfo = ({cast, isCrew}) =>{
    const src='https://image.tmdb.org/t/p/w500';
    return(
        <Container>
            <Img src={cast.profile_path ? `${src}${cast.profile_path}` : userDefault} alt={cast.name} isCrew={isCrew}/>
            <Name isCrew={isCrew}>{cast.name}</Name>
            <Character isCrew={isCrew}>{isCrew ? cast.job : cast.character}</Character>
        </Container>
    )
}
export default CastInfo;
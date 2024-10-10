/* eslint-disable react/prop-types */
import styled from "styled-components";

const Container=styled.div`
    position:relative;
`;
const Img=styled.img`
    width:350px;
    height:150px;
    border-radius:10px;
`;
const Text=styled.div`
    color:white;
    font-weight:800;
    background-color:rgba(0,0,0,0.6);
    padding: 2px 5px;
    border-radius:5px;
    position:absolute;
    top:120px;
    left:10px;
`;
const Category=({img, text})=>{
    return(
        <Container>
            <Img src={img} alt={text}/>
            <Text>{text}</Text>
        </Container>
    );
};
export default Category;
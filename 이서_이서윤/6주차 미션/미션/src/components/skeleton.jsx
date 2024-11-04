import styled from "styled-components";

const Wrapper=styled.div`
    margin:10px;
    height:250px;
    position:relative;
    div{
        margin-top:-3px;
    }
`;
const SkeletonBox=styled.div`
    width:150px;
    height:210px;
    background-color:gray;
    border-radius:10px;
    margin-bottom:10px;
`;
const Line=styled.div`
    width:150px;
    height:10px;
    background-color:gray;
    margin-bottom:10px;
    border-radius:10px;
`;
const Skeleton=()=>{
    return (
        <Wrapper>
            <SkeletonBox/>
            <Line/>
            <Line/>
        </Wrapper>
    )
}

export default Skeleton;
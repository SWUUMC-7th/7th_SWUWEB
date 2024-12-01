import styled from "styled-components";

const Bar = styled.div`
    width:100%;
    display:flex;
    justify-content:center;
    gap:30px;
    *{color:white;}
`;
const Button = styled.button`
    width:60px;
    padding:5px;
    font-size:14px;
    &:first-child{background-color:${(props)=>props.disabled? 'gray':'#F2075D'}};
    &:last-child{background-color:#F2075D;}
`;

interface PaginationProps{
    pageNum:number,
    handlePrevPage:() => void,
    handleNextPage:() => void ,
    prevDisabled:boolean
}

const PaginationBar = ({pageNum,handlePrevPage,handleNextPage,prevDisabled}:PaginationProps) =>{
    return(
        <Bar>
            <Button 
                onClick={handlePrevPage}
                disabled={prevDisabled}
            >
                이전
            </Button>
            <div>{`${pageNum}페이지`}</div>
            <Button 
                onClick={handleNextPage}
            >
                다음
            </Button>
        </Bar>
    )
}
export default PaginationBar;
import { useParams } from "react-router-dom";
import useGetTodo from '../hooks/useGetTodo';
import styled from "styled-components"


const Wrapper = styled.div`
    margin: 0 auto;
    border:1.5px solid #ed5d47;
    border-radius: 5px;
    width:500px;
    height:300px;
    padding: 50px 0 0 0 ;
`;
const Title = styled.div`
    margin-top:20px;
    font-size:18px;
`;
const Content = styled.div`
    margin-top:10px;
    margin-bottom:20px;
    font-size:18px;
`;
const TodoDetail = ()=>{
    const params = useParams();
    const {data, isLoading, isError} = useGetTodo(params.id);
    return(
        <>
            <h1>🍒Todo List🍒</h1>
            <Wrapper>
                <div>{`#${data.id}`}</div>
                <Title>{`title:${data.title}`}</Title>
                <Content>{`content:${data.content}`}</Content>
                <div>{`${data.createdAt}`}</div>
                <div>{`상태:${data.checked ? '완료' : '진행중'}`}</div>
            </Wrapper>
        </>
    )
}
export default TodoDetail
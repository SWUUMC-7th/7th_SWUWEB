import { useParams } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components"
import Button from "../components/Button";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import { getTodo } from "../apis/todo";
// import LoadingSpinner from '../components/Loading';
// import Error from '../components/Error';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../main';
import { deleteTodo } from '../apis/todo';
import { patchTodo } from '../apis/todo';
const Wrapper = styled.div`
    margin: 0 auto;
    border:1.5px solid #ed5d47;
    border-radius: 5px;
    width:500px;
    height:300px;
    padding: 50px 0 0 0 ;
`;
const Title = styled.div`
    font-size:18px;
`;
const Content = styled.div`
    margin-top:10px;
    margin-bottom:10px;
    font-size:18px;
`;
const InputContainer=styled.div`
    display: flex;
    flex-direction: column; 
    margin-left:30%;
    *{height:20px; margin-bottom:8px;}
`;
const InputWrapper=styled.div`
    margin-top:20px;
    margin-bottom:20px;
`;

const TodoDetail = ()=>{
    const params = useParams();
    const id=params.id;
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');
    const navigate=useNavigate();

    const {data} = useQuery({
        queryFn:()=>getTodo({id}),
        queryKey:["todos",id]
    })
    
    // if (isLoading) {
    //     return <LoadingSpinner/>
    // }
    
    //   // 에러 상태 처리
    // if (isError) {
    //     return <Error/>
    // }

    const {mutate:deleteTodoMutation} = useMutation({
        mutationFn:deleteTodo,
        onSuccess:()=>{
          queryClient.invalidateQueries({
            queryKey:["todos"]
          })
          navigate('/')
        },
        onError:(error)=>{
          console.log('삭제 실패',error)
        },
    });
      
    const {mutate:patchTodoMutation} = useMutation({
        mutationFn:patchTodo,
        onSuccess:()=>{
            queryClient.invalidateQueries({
            queryKey:["todos"]
            })
        },
        onError:(error)=>{
            console.log('수정 실패',error)
        },
    });

    const handleDelete = async(id) => {
        deleteTodoMutation({id});
    };

    const handleUpdate = async(id , title, content) => {
        patchTodoMutation({id , title, content})
        setIsEditing(false)
    };

    return(
        <>
            <h1>🍒Todo List🍒</h1>
            {data && <Wrapper>
                <div>{`#${id}`}</div>
                <InputWrapper>
                    {!isEditing && 
                        <>  
                            <Title>{`title:${data.title}`}</Title>
                            <Content>{`content:${data.content}`}</Content>
                            <Button
                                onClick={()=>{
                                setNewTitle(data.title)
                                setNewContent(data.content)
                                setIsEditing(true)
                                }}
                                className="button"
                            >
                                수정하기
                            </Button>
                        </>
                    }
                    {isEditing && 
                        <>
                            <InputContainer>
                                <Input
                                    type="text"
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    id="update_input"
                                />
                                <Input
                                    type="text"
                                    value={newContent}
                                    onChange={(e) => setNewContent(e.target.value)}
                                    id="update_input"
                                />
                            </InputContainer>
                            <Button
                                onClick={() => handleUpdate(id, newTitle, newContent)}
                                className="button"
                            >
                                수정완료
                            </Button>
                        </>
                    }
                    <Button
                        onClick={()=>{
                            handleDelete(data.id)
                        }}
                        className="button"
                    >
                        삭제하기
                    </Button>
                </InputWrapper>
                <div>{`${data.createdAt}`}</div>
                <div>{`상태:${data.checked ? '완료' : '진행중'}`}</div>
            </Wrapper>}
        </>
    )
}
export default TodoDetail
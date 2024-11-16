import { useParams } from "react-router-dom";
import { useState } from "react";
import useGetTodo from '../hooks/useGetTodo';
import useDeleteTodo from "../hooks/useDeleteTodo";
import usePatchTodo from "../hooks/usePatchTodo";
import styled from "styled-components"
import Button from "../components/Button";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";

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
    const {data, isLoading, isError} = useGetTodo(params.id);
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(data.title);
    const [newText, setNewText] = useState(data.content);
    const { deleteTodo } = useDeleteTodo();
    const { updateTodo} = usePatchTodo();
    const navigate=useNavigate();
    const handleDelete = async(id) => {
        await deleteTodo(id);
    };

    const handleUpdate = async(id , title, content) => {
        await updateTodo(id,title, content);
        setIsEditing(false)
    };
    return(
        <>
            <h1>🍒Todo List🍒</h1>
            <Wrapper>
                <div>{`#${data.id}`}</div>
                <InputWrapper>
                    {!isEditing && 
                        <>  
                            <Title>{`title:${data.title}`}</Title>
                            <Content>{`content:${data.content}`}</Content>
                            <Button
                                onClick={()=>{
                                setNewTitle(data.title)
                                setNewText(data.content)
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
                                    value={newText}
                                    onChange={(e) => setNewText(e.target.value)}
                                    id="update_input"
                                />
                            </InputContainer>
                            <Button
                                onClick={() => handleUpdate(data.id, newTitle, newText)}
                                className="button"
                            >
                                수정완료
                            </Button>
                        </>
                    }
                    <Button
                        onClick={()=>{
                            handleDelete(data.id)
                            navigate('/')
                        }}
                        className="button"
                    >
                        삭제하기
                    </Button>
                </InputWrapper>
                <div>{`${data.createdAt}`}</div>
                <div>{`상태:${data.checked ? '완료' : '진행중'}`}</div>
            </Wrapper>
        </>
    )
}
export default TodoDetail
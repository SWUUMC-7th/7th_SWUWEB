import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useFetch } from "./hooks/useFetch";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toDoQueryById, updateToDoMutation, deleteToDoMutation } = useFetch();
  const { data: todo, isLoading, isError } = toDoQueryById(id);

  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    if (!editTitle.trim() || !editContent.trim()) return;
    updateToDoMutation.mutate(
      { id, updatedToDo: { title: editTitle, content: editContent } },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      },
    );
  };

  const handleDelete = () => {
    deleteToDoMutation.mutate(id, {
      onSuccess: () => {
        navigate("/");
      },
    });
  };

  if (isLoading) return <Container>Loading...</Container>;
  if (isError) return <Container>Error fetching the todo</Container>;

  return (
    <Container>
      <Title>TODO 상세 페이지</Title>
      <Form>
        {isEditing ? (
          <>
            <StyledInput
              type="text"
              value={editTitle || todo.title}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="TODO 제목 수정"
            />
            <StyledTextarea
              value={editContent || todo.content}
              onChange={(e) => setEditContent(e.target.value)}
              placeholder="TODO 내용 수정"
            />
            <ButtonGroup>
              <StyledButton onClick={handleSave} complete>
                저장
              </StyledButton>
              <StyledButton onClick={() => setIsEditing(false)}>취소</StyledButton>
            </ButtonGroup>
          </>
        ) : (
          <>
            <h2>{todo.title}</h2>
            <p>{todo.content}</p>
            <ButtonGroup>
              <StyledButton onClick={() => setIsEditing(true)} modify>
                수정
              </StyledButton>
              <StyledButton onClick={handleDelete} delete>
                삭제
              </StyledButton>
            </ButtonGroup>
          </>
        )}
      </Form>
      <StyledButton onClick={() => navigate("/")}>목록으로 돌아가기</StyledButton>
    </Container>
  );
};

export default Detail;

const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.div`
  margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const StyledButton = styled.button`
  padding: 10px 16px;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${(props) =>
    props.delete ? "#fff" : props.modify ? "#979595" : props.complete ? "#000" : "#000"};
  color: ${(props) => (props.delete ? "#ff0000" : "#fff")};
  border: ${(props) => (props.delete ? "1px solid #ff0000" : "none")};

  &:hover {
    opacity: 0.8;
  }
`;

const StyledInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

const StyledTextarea = styled.textarea`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  height: 100px;
`;

import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getTodoDetail } from "../apis/Todo/getTodoDetail";
import { patchTodo } from "../apis/Todo/patchTodo";
import Button from "./Button";
import Input from "./Input";
import styled from "styled-components";
import { deleteTodo } from "../apis/Todo/deleteTodo";

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const Container = styled.label`
  display: flex;
  flex-direction: column;
`;

const TodoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const data = await getTodoDetail(id);
        setTodo(data);
        setTitle(data.title);
        setContent(data.content);
      } catch (error) {
        console.error("Failed to fetch todo details:", error);
      }
    };

    fetchTodo();
  }, [id]);

  if (!todo) return <p>Loading...</p>;

  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      const response = await patchTodo(id, title, content, todo.checked);
      const updatedTodo = await getTodoDetail(id);
      setTodo(updatedTodo);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update todo:", error);
      alert("수정에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo(id); 
      navigate("/"); 
    } catch (error) {
      console.error("Failed to delete todo:", error);
      alert("삭제에 실패했습니다.");
    }
  };

  return (
    <div>
      <h1>Todo 상세</h1>

      <div>
        <Container>
          제목:
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={!isEditing}
          />
        </Container>
      </div>
      <div>
        <Container>
          내용:
          <Input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={!isEditing}
          />
        </Container>
      </div>

      <p>{todo.checked ? "체크됨" : "체크되지 않음"}</p>
      <p>작성일: {todo.createdAt}</p>
      <p>수정일: {todo.updatedAt}</p>

      <ButtonContainer>
        {isEditing ? (
          <>
            <Button onClick={handleUpdate} disabled={isLoading}>
              {isLoading ? "로딩 중..." : "수정 완료"}
            </Button>
            <Button type="button" onClick={() => setIsEditing(false)}>
              취소
            </Button>
          </>
        ) : (
          <Button type="button" onClick={() => setIsEditing(true)}>
            수정하기
          </Button>
        )}

        <Button type="button" onClick={handleDelete}>
          삭제하기
        </Button>
      </ButtonContainer>
    </div>
  );
};

export default TodoDetail;

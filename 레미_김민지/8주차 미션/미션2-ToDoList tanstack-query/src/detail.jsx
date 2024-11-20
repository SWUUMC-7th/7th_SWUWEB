import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useFetch } from "./hooks/useFetch";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchToDoById, editToDo, removeToDo } = useFetch();
  const [todo, setTodo] = useState(null);
  const [editTitle, setEditTitle] = useState(""); // 제목 수정 상태
  const [editContent, setEditContent] = useState(""); // 내용 수정 상태
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // TODO 데이터 가져오기
  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const result = await fetchToDoById(id); // 단일 TODO 조회
        setTodo(result);
        setEditTitle(result.title); // 초기 제목 설정
        setEditContent(result.content); // 초기 내용 설정
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id, fetchToDoById]);

  // 수정 저장 처리
  const handleSave = async () => {
    if (!editTitle.trim() || !editContent.trim()) return;

    try {
      const updatedTodo = { title: editTitle, content: editContent };
      await editToDo(id, updatedTodo); // 수정 API 호출
      setTodo({ ...todo, ...updatedTodo }); // 상태 업데이트
      setIsEditing(false); // 수정 모드 종료
    } catch (err) {
      setError(err.message);
    }
  };

  // 삭제 처리
  const handleDelete = async () => {
    try {
      await removeToDo(id); // 삭제 API 호출
      navigate("/"); // 목록 페이지로 이동
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <Container>Loading...</Container>;
  if (error) return <Container>Error: {error}</Container>;

  return (
    <Container>
      <Title>TODO 상세 페이지</Title>
      <Form>
        {isEditing ? (
          <>
            <StyledInput
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="TODO 제목 수정"
            />
            <StyledTextarea
              value={editContent}
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

// 스타일 정의
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

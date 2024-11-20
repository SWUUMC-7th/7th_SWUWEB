import styled from "styled-components";
import useTodo from "../hooks/useTodo";
import Button from "./Button";
import Input from "./Input";
import { useEffect, useState, useCallback } from "react";
import debounce from "lodash/debounce";
import { useNavigate } from "react-router-dom";
import { patchTodo } from "../apis/Todo/patchTodo";

const AddTodo = styled.form`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const TodoContainer = styled.div`
  display: flex;
  gap: 10px;
  margin: 10px 0;
  align-items: center;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  background-color: #f1f1f1;
  justify-content: space-between;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const TodoText = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
`;

const TodoList = () => {
  const navigate = useNavigate();
  const {
    todos,
    title,
    setTitle,
    content,
    setContent,
    addTodo,
    loading,
    error,
    fetchTodos,
    search,
    setSearch,
    searchTodos,
  } = useTodo();

  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingContent, setEditingContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTodo({
      title: title,
      content: content,
      checked: false,
    });
    setTitle("");
    setContent("");
  };

  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      if (searchTerm.trim()) {
        searchTodos(searchTerm);
      } else {
        fetchTodos();
      }
    }, 500),
    []
  );

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
    debouncedSearch(searchTerm);
  };

  const handleTodoClick = (id) => {
    navigate(`/todo/${id}`);
  };

  const handleEditClick = (todo) => {
    setEditingTodoId(todo.id);
    setEditingTitle(todo.title);
    setEditingContent(todo.content);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await patchTodo(editingTodoId, editingTitle, editingContent, false);
    fetchTodos();
    setEditingTodoId(null);
    setEditingTitle("");
    setEditingContent("");
  };

  const isButtonDisabled = !title.trim() || !content.trim();

  useEffect(() => {
    fetchTodos();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Container>
        <Input
          value={search}
          onChange={handleSearchChange}
          placeholder="검색할 todo 제목을 입력하세요."
        />
      </Container>
      <AddTodo onSubmit={handleSubmit}>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
        />
        <Input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력하세요"
        />
        <Button type="submit" disabled={isButtonDisabled}>
          할 일 등록
        </Button>
      </AddTodo>

      {/* 수정 폼 표시 */}
      {editingTodoId && (
        <AddTodo onSubmit={handleUpdate}>
          <Input
            value={editingTitle}
            onChange={(e) => setEditingTitle(e.target.value)}
            placeholder="수정할 제목을 입력하세요"
          />
          <Input
            value={editingContent}
            onChange={(e) => setEditingContent(e.target.value)}
            placeholder="수정할 내용을 입력하세요"
          />
          <Button
            type="submit"
            disabled={!editingTitle.trim() || !editingContent.trim()}
          >
            수정 완료
          </Button>
          <Button type="button" onClick={() => setEditingTodoId(null)}>
            취소
          </Button>
        </AddTodo>
      )}

      <div>
        {todos.map((todo) => (
          <TodoContainer key={todo.id} onClick={() => handleTodoClick(todo.id)}>
            <TodoText>
              <p>{todo.title}</p>
              <p>{todo.content}</p>
            </TodoText>
            <ButtonContainer>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditClick(todo);
                }}
              >
                수정하기
              </Button>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                삭제하기
              </Button>
            </ButtonContainer>
          </TodoContainer>
        ))}
      </div>
    </div>
  );
};

export default TodoList;

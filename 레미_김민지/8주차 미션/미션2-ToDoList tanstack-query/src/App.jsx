import { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import Input from "./components/Input";
import Button from "./components/Button";
import { useFetch } from "./hooks/useFetch";
import Loading from "./components/Loading";
import Error from "./components/Error";
import { debounce } from "lodash";
import { Link } from "react-router-dom";

const App = () => {
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [isLoadingVisible, setIsLoadingVisible] = useState(true);
  const { data: toDos, loading, error, getToDos, createToDo, removeToDo, editToDo } = useFetch();

  useEffect(() => {
    getToDos({ title: searchTitle });
  }, [searchTitle]);

  const handleSearch = useCallback(
    debounce((query) => {
      getToDos({ title: query });
    }, 500),
    [],
  );

  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchTitle(value);
    handleSearch(value);
  };

  const handleAddToDo = async () => {
    if (!text.trim()) return;

    const newToDo = {
      title: text,
      content: "Default content for now",
      checked: false,
    };

    try {
      await createToDo(newToDo);
      setText("");
      getToDos();
    } catch (error) {
      console.error("Error adding to-do:", error);
    }
  };

  const handleModifyToDo = async (id, updatedText) => {
    if (!updatedText.trim()) return;

    const updatedToDo = {
      title: updatedText,
      content: "Updated content",
      checked: false,
    };

    try {
      await editToDo(id, updatedToDo);
      setEditingId(null);
      setEditText("");
      getToDos();
    } catch (error) {
      console.error("Failed to update to-do:", error);
    }
  };

  const handleDeleteToDo = async (id) => {
    try {
      await removeToDo(id);
      getToDos();
    } catch (error) {
      console.error("Error deleting to-do:", error);
    }
  };

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setIsLoadingVisible(false);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setIsLoadingVisible(false);
    }
  }, [loading]);

  if (loading && isLoadingVisible) return <Loading />;
  if (error) return <Error />;

  return (
    <Container>
      <Title>8주차 실습 - API with tanstack-query</Title>
      <Form>
        <StyledInput
          type="text"
          value={searchTitle}
          onChange={handleSearchInput}
          placeholder="TODO 제목 검색"
        />
      </Form>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddToDo();
        }}
      >
        <StyledInput
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="할 일을 입력하세요"
        />
        <StyledButton type="submit">할 일 등록</StyledButton>
      </Form>
      <TodoList>
        {toDos?.length === 0 ? (
          <NoResult>검색 결과가 없습니다.</NoResult>
        ) : (
          toDos?.map((toDo) => (
            <TodoItem key={toDo.id}>
              {editingId === toDo.id ? (
                <Task>
                  <span>{toDo.id}) </span>
                  <StyledInput
                    placeholder="할 일을 수정해주세요"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                </Task>
              ) : (
                <Task>
                  <span>{toDo.id}) </span>
                  <Link to={`/todo/${toDo.id}`}>
                    <span>{toDo.title}</span>
                  </Link>
                </Task>
              )}
              <ButtonGroup>
                <StyledButton onClick={() => handleDeleteToDo(toDo.id)} delete>
                  삭제하기
                </StyledButton>
                {editingId === toDo.id ? (
                  <StyledButton onClick={() => handleModifyToDo(toDo.id, editText)} complete>
                    수정 완료
                  </StyledButton>
                ) : (
                  <StyledButton
                    onClick={() => {
                      setEditingId(toDo.id);
                      setEditText(toDo.title);
                    }}
                    modify
                  >
                    수정 진행
                  </StyledButton>
                )}
              </ButtonGroup>
            </TodoItem>
          ))
        )}
      </TodoList>
    </Container>
  );
};

export default App;

const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  margin: 30px 0;
`;

const Form = styled.form`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const StyledInput = styled.input`
  flex-grow: 1;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const StyledButton = styled(Button)`
  padding: 8px 16px;
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

const TodoList = styled.ul`
  list-style: none;
  padding: 0;
`;

const TodoItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Task = styled.div`
  font-weight: 600;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const NoResult = styled.div`
  text-align: center;
  font-size: 16px;
  color: #555;
`;

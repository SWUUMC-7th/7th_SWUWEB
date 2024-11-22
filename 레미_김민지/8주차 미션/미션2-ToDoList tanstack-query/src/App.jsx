import { useState, useCallback } from "react";
import styled from "styled-components";
import { debounce } from "lodash";
import { Link } from "react-router-dom";
import { useFetch } from "./hooks/useFetch";
import Button from "./components/Button";

const App = () => {
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null); // 수정 중인 ToDo ID
  const [editTitle, setEditTitle] = useState(""); // 수정할 제목
  const [searchTitle, setSearchTitle] = useState(""); // 검색어 상태

  const { toDosQuery, addToDoMutation, deleteToDoMutation, updateToDoMutation } = useFetch();

  const handleSearch = useCallback(
    debounce((query) => {
      setSearchTitle(query);
    }, 500),
    [],
  );

  const handleSearchInput = (e) => {
    handleSearch(e.target.value);
  };

  const handleAddToDo = () => {
    if (!text.trim()) return;
    addToDoMutation.mutate({ title: text, content: "Default content for now", checked: false });
    setText("");
  };

  const handleDeleteToDo = (id) => {
    deleteToDoMutation.mutate(id);
  };

  const handleEditClick = (toDo) => {
    setEditId(toDo.id);
    setEditTitle(toDo.title);
  };

  const handleSaveEdit = () => {
    updateToDoMutation.mutate(
      {
        id: editId,
        updatedToDo: { title: editTitle },
      },
      {
        onSuccess: () => {
          setEditId(null);
          setEditTitle("");
        },
      },
    );
  };

  if (toDosQuery.isLoading) return <Container>Loading...</Container>;
  if (toDosQuery.isError) return <Container>Error: {toDosQuery.error.message}</Container>;

  const filteredToDos = toDosQuery.data.filter((toDo) =>
    toDo.title.toLowerCase().includes(searchTitle.toLowerCase()),
  );

  return (
    <Container>
      <Title>TODO 관리</Title>
      <Form>
        <StyledInput type="text" placeholder="검색어를 입력하세요" onChange={handleSearchInput} />
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
        <StyledButton type="submit">추가</StyledButton>
      </Form>
      <TodoList>
        {filteredToDos.map((toDo) => (
          <TodoItem key={toDo.id}>
            {editId === toDo.id ? (
              <Task>
                <StyledInput
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="제목을 수정하세요"
                />
                <ButtonGroup>
                  <StyledButton onClick={handleSaveEdit} complete>
                    저장
                  </StyledButton>
                  <StyledButton onClick={() => setEditId(null)}>취소</StyledButton>
                </ButtonGroup>
              </Task>
            ) : (
              <Task>
                <Link to={`/todo/${toDo.id}`}>{toDo.title}</Link>
              </Task>
            )}
            <ButtonGroup>
              <StyledButton onClick={() => handleEditClick(toDo)} modify>
                수정
              </StyledButton>
              <StyledButton onClick={() => handleDeleteToDo(toDo.id)} delete>
                삭제
              </StyledButton>
            </ButtonGroup>
          </TodoItem>
        ))}
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

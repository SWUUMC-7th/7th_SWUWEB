import { TodoProvider } from "./context/TodoContext";
import TodoList from "./components/TodoList";
import styled from "styled-components";

const Container = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 500px;
  min-height: 600px;
  margin: auto;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
`;

function App() {
  return (
    <TodoProvider>
      <Container>
        <Title>Todo List</Title>
        <TodoList />
      </Container>
    </TodoProvider>
  );
}

export default App;

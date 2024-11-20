import TodoList from "./components/TodoList";
import styled from "styled-components";

const Container = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 600px;
  min-height: 600px;
  margin: auto;
`;

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
`;

function App() {
  return (
    <AppContainer>
      <Container>
        <Title>Todo List</Title>
        <TodoList />
      </Container>
    </AppContainer>
  );
}

export default App;

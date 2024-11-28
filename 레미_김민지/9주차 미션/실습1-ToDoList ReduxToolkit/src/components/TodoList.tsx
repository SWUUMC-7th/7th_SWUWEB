import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, toggleTodo, deleteTodo } from "../slices/todoSlice";
import { RootState } from "../app/store";

const TodoApp: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();
  const [text, setText] = useState<string>("");
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  console.log("Current Redux Todos:", todos);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAddTodo = (): void => {
    if (text.trim()) {
      dispatch(addTodo(text));
      setText("");
    }
  };

  const formatDate = (date: Date): string => {
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString("ko-KR");
  };

  return (
    <AppContainer>
      <Header>
        <DateWrapper>
          <span>{formatDate(currentDateTime)}</span>
          <Time>{formatTime(currentDateTime)}</Time>
        </DateWrapper>
        <Day>{currentDateTime.toLocaleDateString("ko-KR", { weekday: "long" })}</Day>
      </Header>
      <TodoContainer>
        <InputWrapper>
          <TodoInput
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="할 일을 입력하세요"
          />
          <AddButton onClick={handleAddTodo}>+</AddButton>
        </InputWrapper>
        <TodoList>
          {todos.map((todo) => (
            <TodoItem key={todo.id}>
              <Checkbox
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch(toggleTodo(todo.id))}
              />
              <TodoText completed={todo.completed}>{todo.text}</TodoText>
              <DeleteButton onClick={() => dispatch(deleteTodo(todo.id))}>🗑</DeleteButton>
            </TodoItem>
          ))}
        </TodoList>
      </TodoContainer>
    </AppContainer>
  );
};

export default TodoApp;

const AppContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  background-color: #f8f9fa;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  font-family: "Arial", sans-serif;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const DateWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-weight: bold;
`;

const Time = styled.span`
  color: #e74c3c;
`;

const Day = styled.div`
  font-size: 16px;
  color: #7f8c8d;
`;

const TodoContainer = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const TodoInput = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-right: 10px;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const AddButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background-color: #2ecc71;
  color: white;
  font-size: 24px;
  cursor: pointer;

  &:hover {
    background-color: #27ae60;
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
  margin-bottom: 10px;
`;

const Checkbox = styled.input`
  margin-right: 10px;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const TodoText = styled.span<{ completed: boolean }>`
  flex: 1;
  font-size: 16px;
  color: ${({ completed }) => (completed ? "#bdc3c7" : "#2c3e50")};
  text-decoration: ${({ completed }) => (completed ? "line-through" : "none")};
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #e74c3c;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    color: #c0392b;
  }
`;

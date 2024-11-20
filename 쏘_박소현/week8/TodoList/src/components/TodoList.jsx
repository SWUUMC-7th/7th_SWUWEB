import styled from "styled-components";
import { useTodos } from "../context/TodoContext";
import Button from "./Button";
import Input from "./Input";

const AddTodo = styled.form`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
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

const TodoList = () => {
  const {
    todos,
    text,
    setText,
    editingId,
    setEditingId,
    editText,
    setEditText,
    addTodo,
    deleteTodo,
    updateTodo,
  } = useTodos();

  const handleSubmit = (e) => e.preventDefault();

  return (
    <div>
      <AddTodo onSubmit={handleSubmit}>
        <Input value={text} onChange={(e) => setText(e.target.value)} />
        <Button onClick={addTodo} type="submit">
          할 일 등록
        </Button>
      </AddTodo>
      <div>
        {todos.map((todo) => (
          <TodoContainer key={todo.id}>
            <TodoText>
              <p>{todo.id}</p>
              {editingId === todo.id ? (
                <Input
                  defaultValue={todo.task}
                  onChange={(e) => setEditText(e.target.value)}
                />
              ) : (
                <p>{todo.task}</p>
              )}
            </TodoText>
            <ButtonContainer>
              <Button onClick={() => deleteTodo(todo.id)}>삭제하기</Button>
              {editingId === todo.id ? (
                <Button onClick={() => updateTodo(editingId, editText)}>
                  수정 완료
                </Button>
              ) : (
                <Button onClick={() => setEditingId(todo.id)}>수정 진행</Button>
              )}
            </ButtonContainer>
          </TodoContainer>
        ))}
      </div>
    </div>
  );
};

export default TodoList;

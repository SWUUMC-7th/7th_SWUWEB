import { useState } from "react";
import Button from "./components/Button";
import Input from "./components/Input";

function App() {
  const [todos, setTodos] = useState([{ id: 1, task: "투두 만들기" }]);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState("");
  const [editText, setEditText] = useState("");

  // 랜더링 방지 => form 태그 안에서 버튼을 누르면 리랜더링 방지
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // 추가하기
  const addTodo = () => {
    if (text.trim().length === 0) {
      alert("텍스트를 입력해주세요.");
      return;
    }
    setTodos((prev) => [...prev, { id: Math.floor(Math.random() * 100 + 2), task: text }]);
    setText("");
  };

  // 삭제하기
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  // 수정 진행
  const updateTodo = (id, text) => {
    setTodos((prev) =>
      prev.map((item) => (item.id === id ? { ...item, task: text } : item))
    );
    setEditingId("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input value={text} onChange={(e) => setText(e.target.value)} />
        <Button onClick={addTodo} type="submit">
          할 일 등록
        </Button>
      </form>
      <div>
        {todos.map((todo) => (
          <div key={todo.id} style={{ display: "flex", gap: "20px" }}>
            <div style={{ display: "flex", gap: "5px" }}>
              {editingId === todo.id ? (
                // 수정 중일 때
                <>
                  <p>{todo.id}</p>
                  <Input
                    defaultValue={todo.task}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                </>
              ) : (
                // 수정 중이 아닐 때
                <>
                  <p>{todo.id}</p>
                  <p>{todo.task}</p>
                </>
              )}
            </div>
            <Button onClick={() => deleteTodo(todo.id)}>삭제하기</Button>
            {editingId === todo.id ? (
              <Button onClick={() => updateTodo(editingId, editText)}>수정 완료</Button>
            ) : (
              <Button onClick={() => setEditingId(todo.id)}>수정 진행</Button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;

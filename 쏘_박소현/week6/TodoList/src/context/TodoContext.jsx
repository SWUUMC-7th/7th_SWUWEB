import { createContext, useContext, useState } from "react";

// Context 생성
const TodoContext = createContext();

// Context Provider 생성
export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([{ id: 1, task: "투두 만들기" }]);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState("");
  const [editText, setEditText] = useState("");

  const addTodo = () => {
    if (text.trim().length === 0) {
      alert("텍스트를 입력해주세요.");
      return;
    }
    setTodos((prev) => [
      ...prev,
      { id: Math.floor(Math.random() * 100 + 2), task: text },
    ]);
    setText("");
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  const updateTodo = (id, newText) => {
    setTodos((prev) =>
      prev.map((item) => (item.id === id ? { ...item, task: newText } : item))
    );
    setEditingId("");
  };

  return (
    <TodoContext.Provider
      value={{
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
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

// Context Hook 생성
export const useTodos = () => {
  return useContext(TodoContext);
};

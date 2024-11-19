import { createContext, useState } from "react";

//데이터를 담고 있음
export const TodoContext = createContext();

// 우산을 만듬
export function TodoContextProvider({ children }) {
  const [toDos, setToDos] = useState([{ id: 1, task: "투두 만들어보기" }]);
  const [text, setText] = useState("");
  const [editText, setEditText] = useState("");
  const [editingId, setEditingId] = useState("");

  // 핸들링 방지
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const addToDo = () => {
    if (text.trim() === "") return;
    setToDos((prev) => [...prev, { id: Math.floor(Math.random() * 100) + 2, task: text }]);
    setText("");
  };

  const deleteToDo = (id) => {
    setToDos((prev) => prev.filter((item) => item.id !== id));
  };

  const modifyToDo = (id, text) => {
    if (text.trim() === "") return;
    setToDos((prev) => prev.map((item) => (item.id === id ? { ...item, task: text } : item)));
    setEditingId("");
  };
  return (
    <TodoContext.Provider
      value={{
        toDos,
        setToDos,
        text,
        setText,
        editingId,
        setEditingId,
        editText,
        setEditText,
        handleSubmit,
        addToDo,
        deleteToDo,
        modifyToDo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

import { useState } from "react";
import Input from "./components/Input";
function App() {
  const [toDos, setToDos] = useState([{ id: 1, task: "투두 만들어보기" }]);
  const [text, setText] = useState("");
  const [editText, setEditText] = useState("");
  const [editingId, setEditingId] = useState("");

  // 핸들링 방지
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const addToDo = () => {
    setToDos((prev) => [...prev, { id: Math.floor(Math.random() * 100) + 2, task: text }]);
    setText("");
  };

  const deleteToDo = (id) => {
    setToDos((prev) => prev.filter((item) => item.id !== id));
  };

  const modifyToDo = (id, text) => {
    setToDos((prev) => prev.map((item) => (item.id === id ? { ...item, task: text } : item)));
    setEditingId("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input value={text} onChange={(e) => setText(e.target.value)} />
        <button
          onClick={() => {
            addToDo();
          }}
        >
          할 일 등록
        </button>
      </form>
      <div>
        {toDos.map((toDo) => (
          <div key={toDo.id} style={{ display: "flex", gap: "20px" }}>
            {editingId === toDo.id ? (
              <>
                <div style={{ display: "flex", gap: "20px", fontWeight: 600 }}>
                  <p>{toDo.id}.</p>
                  <Input
                    placeholder={"할 일을 수정해주세요"}
                    defaultValue={toDo.task}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                </div>
              </>
            ) : (
              <>
                <div style={{ display: "flex", gap: "20px", fontWeight: 600 }}>
                  <p>{toDo.id}. </p>
                  <p>{toDo.task}</p>
                </div>
              </>
            )}
            <button onClick={() => deleteToDo(toDo.id)}>삭제하기</button>
            {editingId === toDo.id ? (
              <button onClick={() => modifyToDo(editingId, editText)}>수정 완료</button>
            ) : (
              <button onClick={() => setEditingId(toDo.id)}>수정 진행</button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;

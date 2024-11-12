import { useContext } from "react";
import Input from "./components/Input";
import Button from "./components/Button";
import "./App.css";
import { TodoContext } from "./context/TodoContext";

function App() {
  const {
    toDos,
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
  } = useContext(TodoContext);

  return (
    <div className="container">
      <h1>6주차 실습 - ContextAPI Refactoring</h1>
      <form onSubmit={handleSubmit} className="form">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="할 일을 입력하세요"
        />
        <Button onClick={addToDo} type="submit" className="">
          할 일 등록
        </Button>
      </form>
      <ul className="todo-list">
        {toDos.map((toDo) => (
          <li key={toDo.id} className="todo-item">
            {editingId === toDo.id ? (
              <div className="task">
                <span>{toDo.id}) </span>
                <Input
                  placeholder="할 일을 수정해주세요"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
              </div>
            ) : (
              <div className="task">
                <span>{toDo.id}) </span>
                <span>{toDo.task}</span>
              </div>
            )}
            <div className="button-group">
              <Button onClick={() => deleteToDo(toDo.id)} className="delete">
                삭제하기
              </Button>
              {editingId === toDo.id ? (
                <Button onClick={() => modifyToDo(editingId, editText)} className="complete">
                  수정 완료
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setEditingId(toDo.id);
                    setEditText(toDo.task);
                  }}
                  className="modify"
                >
                  수정 진행
                </Button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

import { useTodos } from "../context/TodoContext";
import Button from "./Button";
import Input from "./Input";

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
      <form onSubmit={handleSubmit}>
        <div className="addTodo">
          <Input value={text} onChange={(e) => setText(e.target.value)} />
          <Button onClick={addTodo} type="submit">
            할 일 등록
          </Button>
        </div>
      </form>
      <div>
        {todos.map((todo) => (
          <div key={todo.id} className="todoContainer">
            <div style={{ display: "flex", gap: "5px" }}>
              {editingId === todo.id ? (
                <div className="todoText">
                  <p>{todo.id}</p>
                  <Input
                    defaultValue={todo.task}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                </div>
              ) : (
                <div className="todoText">
                  <p>{todo.id}</p>
                  <p>{todo.task}</p>
                </div>
              )}
            </div>
            <div className="buttonContainer">
              <Button onClick={() => deleteTodo(todo.id)}>삭제하기</Button>
              {editingId === todo.id ? (
                <Button onClick={() => updateTodo(editingId, editText)}>
                  수정 완료
                </Button>
              ) : (
                <Button onClick={() => setEditingId(todo.id)}>수정 진행</Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;

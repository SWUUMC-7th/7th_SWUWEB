import InputTodo from "./components/InputTodo";
import TodoList from "./components/TodoList";

export default function App() {
  return (
    <div className="App">
      <h1>Todo List</h1>
      <InputTodo />
      <TodoList />
    </div>
  );
}

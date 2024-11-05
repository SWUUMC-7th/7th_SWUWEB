import { TodoProvider } from "./context/TodoContext";
import TodoList from "./components/TodoList";
import './App.css';

function App() {
  return (
    <TodoProvider>
      <div className="container">
        <h1>Todo List</h1>
        <TodoList />
      </div>
    </TodoProvider>
  );
}

export default App;

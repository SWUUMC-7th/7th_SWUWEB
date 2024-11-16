import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TodoList from "./pages/todoList";
import TodoDetail from "./pages/todoDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TodoList />,
  },
  {
    path: "/todo/:id", // 동적 라우트 추가
    element: <TodoDetail/>, // TodoDetail 페이지 렌더링
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;






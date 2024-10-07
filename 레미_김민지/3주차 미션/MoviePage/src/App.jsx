import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/home.jsx";
import NotFound from "./pages/not-found.jsx";
import Movies from "./pages/movies.jsx";
import Login from "./pages/login.jsx";
import SignUp from "./pages/signup.jsx";
import RootLayout from "./layout/root-layout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        //path: "movies/:movieId",
        path: "movies",
        element: <Movies />,
      },
      {
        path: "login", // 로그인 페이지 경로 추가
        element: <Login />,
      },
      {
        path: "signup", // 회원가입 페이지 경로 추가
        element: <SignUp />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

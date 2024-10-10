import './App.css'

import {createBrowserRouter, RouterProvider} from "react-router-dom";

// 1. 만든 페이지들을 import
import HomePage from "./pages/home.jsx";
import NotFound from "./pages/not-found.jsx";
import Movies from "./pages/movies.jsx";
import RootLayout from './layout/root-layout.jsx';
// 2. 연결
const router = createBrowserRouter([
    {
        path: '/',
        // element: <HomePage/>,
        element: <RootLayout/>,
        errorElement: <NotFound/>,
        children:[
          {
            index:true, // 홈 경로
            element:<HomePage/>
          },
          {
            path:'movies', //부모 path : '/'이라 '/movies'라 쓰지 않아도 됨
            element:<Movies/>
          }
        ]
    }
])

function App() {
    return <RouterProvider router={router}/>
}

export default App

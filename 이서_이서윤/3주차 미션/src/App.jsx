import {createBrowserRouter, RouterProvider} from "react-router-dom";

import HomePage from "./pages/home.jsx";
import NotFound from "./pages/not-found.jsx";
import Movies from "./pages/movies.jsx";
import RootLayout from './layout/root-layout.jsx';
import LogIn from './pages/login.jsx';
import SignUp from './pages/signup.jsx';
import Search from "./pages/search.jsx";

const router = createBrowserRouter([
    {
        path: '/',
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
          },
          {
            path:'login',
            element:<LogIn/>
          },
          {
            path:'signup',
            element:<SignUp/>
          },
          {
            path:'search',
            element:<Search/>
          },
        ]
    }
])

function App() {
    return <RouterProvider router={router}/>
}

export default App

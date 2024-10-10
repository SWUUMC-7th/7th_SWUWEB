import {createBrowserRouter, RouterProvider} from "react-router-dom";

import HomePage from "./pages/home.jsx";
import NotFound from "./pages/not-found.jsx";
import Movies from "./pages/movies.jsx";
import RootLayout from './layout/root-layout.jsx';
import LogIn from './pages/login.jsx';
import SignUp from './pages/signup.jsx';
import Search from "./pages/search.jsx";
import NowPaying from "./pages/now-playing.jsx";
import Popular from "./pages/popular.jsx";
import TopRated from "./pages/top-rated.jsx";
import UpComing from "./pages/up-coming.jsx";
const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
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
          {
            path:'movies/now-playing',
            element:<NowPaying/>
          },
          {
            path:'movies/popular',
            element:<Popular/>
          },
          {
            path:'movies/top-rated',
            element:<TopRated/>
          },
          {
            path:'movies/up-coming',
            element:<UpComing/>
          },
        ]
    },
    {
      path: '*',
      element:<NotFound/>
    }
])

function App() {
    return <RouterProvider router={router}/>
}

export default App

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./pages/home.tsx";
import NotFound from "./pages/not-found.tsx";
import Movies from "./pages/movies.tsx";
import RootLayout from './layout/root-layout.tsx';
import LogIn from './pages/login.tsx';
import SignUp from './pages/signup.tsx';
import Search from "./pages/search.tsx";
import NowPaying from "./pages/now-playing.tsx";
import Popular from "./pages/popular.tsx";
import TopRated from "./pages/top-rated.tsx";
import UpComing from "./pages/up-coming.tsx";
import MovieDetails from "./pages/movieDetails.tsx";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
          {
            path:'movies/:movieId',
            element:<MovieDetails/>
          },
        ]
    },
    {
      path: '*',
      element:<NotFound/>
    }
])

const queryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}

export default App
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
import MovieDetails from "./pages/movieDetails.jsx";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
console.log('queryClient',queryClient);
console.log('queryClient.getQueryCache',queryClient.getQueryCache);
function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App

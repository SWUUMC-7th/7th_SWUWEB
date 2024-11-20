import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import HomePage from "./pages/home.jsx";
import NotFound from "./pages/not-found.jsx";
import MoviesPage from "./pages/movies.jsx";
import Login from "./pages/login.jsx";
import SignUp from "./pages/signup.jsx";
import Search from "./pages/search.jsx";
import NowPlayingMovies from "./pages/nowPlayingMovies.jsx";
import PopularMovies from "./pages/popularMovies.jsx";
import UpComingMovies from "./pages/upcomingMovies.jsx";
import TopRatedMovies from "./pages/topRatedMovies.jsx";
import MovieDetail from "./pages/movieDetail.jsx";
import Category from "./components/category.jsx";
import Actors from "./pages/actor.jsx";
import ActorDetail from "./pages/actorDetail.jsx";
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
        path: "movies",
        element: <MoviesPage />,
        children: [
          {
            index: true, // 기본 경로로 카테고리만 표시
            element: <Category />,
          },
          {
            path: "now-playing",
            element: <NowPlayingMovies />,
          },
          {
            path: "popular",
            element: <PopularMovies />,
          },
          {
            path: "top-rated",
            element: <TopRatedMovies />,
          },
          {
            path: "up-coming",
            element: <UpComingMovies />,
          },
          {
            path: ":movieId",
            element: <MovieDetail />,
          },
        ],
      },
      {
        path: "actors", // 배우 검색 경로 추가
        element: <Actors />,
      },
      {
        path: "actors/:actorId",
        element: <ActorDetail />, // 배우 상세 경로
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "search",
        element: <Search />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;

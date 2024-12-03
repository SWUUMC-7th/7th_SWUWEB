import { createBrowserRouter } from "react-router-dom";
import RoutePaths from "./RoutePaths";
import RootLayout from "../layouts/RootLayout";
import {
  Home,
  Movies,
  NotFound,
  NowPlayingMovies,
  PopularMovies,
  Search,
  TopRatedMovies,
  UpcomingMovies,
} from "../pages/_index";

const router = createBrowserRouter([
  {
    path: RoutePaths.HOME,
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: RoutePaths.MOVIES,
        element: <Movies />,
        children: [
          //       {
          //         path: RoutePaths.MOVIE_DETAIL,
          //         element: <MovieDetail />,
          //       },
        ],
      },
      {
        path: RoutePaths.MOVIES_NOW_PLAYING,
        element: <NowPlayingMovies />,
      },
      {
        path: RoutePaths.MOVIES_POPULAR,
        element: <PopularMovies />,
      },
      {
        path: RoutePaths.MOVIES_TOP_RATED,
        element: <TopRatedMovies />,
      },
      {
        path: RoutePaths.MOVIES_UPCOMING,
        element: <UpcomingMovies />,
      },
      //   {
      //     path: RoutePaths.ACTORS,
      //     element: <Actors />,
      //   },
      //   {
      //     path: RoutePaths.ACTOR_DETAIL,
      //     element: <ActorDetail />,
      //   },
      //   {
      //     path: RoutePaths.LOGIN,
      //     element: <Login />,
      //   },
      //   {
      //     path: RoutePaths.SIGNUP,
      //     element: <SignUp />,
      //   },
      {
        path: RoutePaths.SEARCH,
        element: <Search />,
      },
    ],
  },
]);

export default router;

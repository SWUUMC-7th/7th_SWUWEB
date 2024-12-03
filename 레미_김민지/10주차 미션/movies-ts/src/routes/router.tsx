import { createBrowserRouter } from "react-router-dom";
import RoutePaths from "./RoutePaths";
import RootLayout from "../layouts/RootLayout";
import { Home, NotFound } from "../pages/_index";

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
      //   {
      //     path: RoutePaths.MOVIES,
      //     element: <Movies />, // Category는 MoviesPage 안에서 렌더링됨
      //     children: [
      //       {
      //         path: RoutePaths.MOVIES_NOW_PLAYING,
      //         element: <NowPlayingMovies />,
      //       },
      //       {
      //         path: RoutePaths.MOVIES_POPULAR,
      //         element: <PopularMovies />,
      //       },
      //       {
      //         path: RoutePaths.MOVIES_TOP_RATED,
      //         element: <TopRatedMovies />,
      //       },
      //       {
      //         path: RoutePaths.MOVIES_UPCOMING,
      //         element: <UpComingMovies />,
      //       },
      //       {
      //         path: RoutePaths.MOVIE_DETAIL,
      //         element: <MovieDetail />,
      //       },
      //     ],
      //   },
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
      //   {
      //     path: RoutePaths.SEARCH,
      //     element: <Search />,
      //   },
    ],
  },
]);

export default router;

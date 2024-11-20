import {createBrowserRouter} from "react-router-dom";
import HomePage from "../pages/HomePage";
import NotFound from "../pages/NotFound";
import MoviesPage from "../pages/MoviesPage";
import RootLayout from "../layout/RootLayout";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import SearchPage from "../pages/SearchPage";
import CategoryPage from "../pages/CategoryPage";
import DetailPage from "../pages/DetailPage";


const router = createBrowserRouter([
  {
      path: '/',
      element: <RootLayout/>,
      errorElement: <NotFound/>,
      children: [
        {
            index: true,
            element: <HomePage/>
        },
        {
          path: 'movies/categories/:category',
            element: <MoviesPage/>
        },
        {
          path: 'movies/:movieId',
            element: <DetailPage/>
        },
        {
          path: 'sign-in',
            element: <SignInPage/>
        },
        {
          path: 'sign-up',
            element: <SignUpPage/>
        },
        {
          path: 'search',
            element: <SearchPage/>
        },
        {
          path: 'movies/categories',
            element: <CategoryPage/>
        },
    ]
  },

  ])



export default router
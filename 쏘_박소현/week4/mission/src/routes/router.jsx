import {createBrowserRouter} from "react-router-dom";
import HomePage from "../pages/HomePage";
import NotFound from "../pages/NotFound";
import MoviesPage from "../pages/MoviesPage";
import RootLayout from "../layout/RootLayout";
import SigninPage from "../pages/SigninPage";
import SignupPage from "../pages/SignupPage";
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
            element: <SigninPage/>
        },
        {
          path: 'sign-up',
            element: <SignupPage/>
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
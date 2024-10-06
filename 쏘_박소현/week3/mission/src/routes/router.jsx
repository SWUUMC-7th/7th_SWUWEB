import {createBrowserRouter} from "react-router-dom";
import HomePage from "../pages/HomePage";
import NotFound from "../pages/NotFound";
import MoviesPage from "../pages/MoviesPage";
import RootLayout from "../layout/RootLayout";
import SigninPage from "../pages/SigninPage";
import SignupPage from "../pages/SignupPage";


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
          path: 'movies/:movieId',
            element: <MoviesPage/>
        },
        {
          path: 'sign-in',
            element: <SigninPage/>
        },
        {
          path: 'sign-up',
            element: <SignupPage/>
        }
    ]
  },

  ])



export default router
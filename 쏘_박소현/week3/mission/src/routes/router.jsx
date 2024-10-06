import {createBrowserRouter} from "react-router-dom";
import HomePage from "../pages/HomePage";
import NotFound from "../pages/NotFound";
import MoviesPage from "../pages/MoviesPage";
import RootLayout from "../layout/RootLayout";


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
            path: 'movies',
            element: <MoviesPage/>
        }
    ]
  },

  ])



export default router
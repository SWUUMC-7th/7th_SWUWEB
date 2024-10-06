import {createBrowserRouter} from "react-router-dom";
import HomePage from "../pages/HomePage";
import NotFound from "../pages/NotFound";
import MoviesPage from "../pages/MoviesPage";


const router = createBrowserRouter([
  {
      path: '/',
      element: <HomePage/>,
      errorElement: <NotFound/>
  },
  {
      path: '/movies',
      element: <MoviesPage/>
  }
])


export default router
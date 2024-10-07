import { Outlet } from "react-router-dom";
import Category from "../components/category";

const MoviesPage = () => {
  return (
    <>
      <Category />
      <Outlet />
    </>
  );
};

export default MoviesPage;

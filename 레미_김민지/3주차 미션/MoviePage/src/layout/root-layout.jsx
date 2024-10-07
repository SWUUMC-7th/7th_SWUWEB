import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar.jsx";
import Sidebar from "../components/sidebar.jsx";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Outlet />
    </>
  );
};

export default RootLayout;

import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="layout">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <div className="page">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
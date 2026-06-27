import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <div className="sidebar">
      <h1 className="logo">Finance Dashboard</h1>

      <div className="sidebar-menu">
        <ul>

          {(user?.role === "admin" || user?.role === "analyst") && (
            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
          )}

          <li>
            <NavLink to="/records">Records</NavLink>
          </li>

          {user?.role === "admin" && (
            <li>
              <NavLink to="/users">Users</NavLink>
            </li>
          )}

        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
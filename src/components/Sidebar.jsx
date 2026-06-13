import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <div className="sidebar">
      <h1 className="logo">
        Finance Dashboard
      </h1>

      <div className="sidebar-menu">
        <ul className="space-y-4">

          {(user?.role === "admin" ||
            user?.role === "analyst") && (
            <li>
              <Link to="/dashboard">
                Dashboard
              </Link>
            </li>
          )}

          <li>
            <Link to="/records">
              Records
            </Link>
          </li>

          {user?.role === "admin" && (
            <li>
              <Link to="/users">
                Users
              </Link>
            </li>
          )}

        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
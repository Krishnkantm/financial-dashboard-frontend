import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="navbar">
      <h2>
        Welcome {user?.name} ({user?.role})
      </h2>

      <button
        onClick={logout}
        className="logout-btn"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
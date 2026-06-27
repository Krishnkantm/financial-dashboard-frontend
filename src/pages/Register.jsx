import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "viewer",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage("Registration Successful! Redirecting to Login...");

        setFormData({
          name: "",
          email: "",
          password: "",
          role: "viewer",
        });

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setMessage(data.message || "Registration Failed");
      }
    } catch (err) {
      setMessage("Server Error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">

        <h2 className="register-title">Create Account</h2>

        <p className="register-subtitle">
          Register to access your Finance Dashboard
        </p>

        <form className="register-form" onSubmit={handleSubmit}>

          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>

          <div className="input-group">
            <label>Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="viewer">Viewer</option>
              <option value="analyst">Analyst</option>
            </select>
          </div>

          <button
            type="submit"
            className="register-btn"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

        {message && (
          <p
            className={`register-message ${
              message.includes("Successful") ? "success" : "error"
            }`}
          >
            {message}
          </p>
        )}

        <div className="register-footer">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </div>

      </div>
    </div>
  );
}

export default Register;
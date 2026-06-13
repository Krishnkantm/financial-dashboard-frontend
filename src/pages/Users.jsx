import { useEffect, useState } from "react";
import {
  getUsers,
  createUser,
} from "../api/userApi.js";

const Users = () => {
  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "viewer",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();

      setUsers(res.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createUser(formData);

      alert("User Created Successfully");

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "viewer",
      });

      fetchUsers();
    } catch (error) {
      alert(
        error.response?.data?.message
      );
    }
  };

  return (
    <div className="users-page">

      <h1 className="page-title">
        User Management
      </h1>

      <div className="form-card">
        <h2 className="section-title">
          Create New User
        </h2>

        <form
          onSubmit={handleSubmit}
          className="form-grid"
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="input-field"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input-field"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input-field"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <select
            name="role"
            className="input-field"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="viewer">
              Viewer
            </option>

            <option value="analyst">
              Analyst
            </option>

            <option value="admin">
              Admin
            </option>
          </select>

          <button
            type="submit"
            className="success-btn"
          >
            Create User
          </button>
        </form>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>

                <td>{user.email}</td>

                <td>{user.role}</td>

                <td>
                  {user.isActive
                    ? "Active"
                    : "Inactive"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Users;
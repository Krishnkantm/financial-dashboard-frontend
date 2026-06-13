import { useEffect, useState } from "react";
import {
  getRecords,
  createRecord,
  updateRecord,
  deleteRecord,
} from "../api/recordApi.js";
import { useAuth } from "../context/AuthContext.jsx";

const initialForm = {
  amount: "",
  type: "income",
  category: "",
  date: "",
  note: "",
};

const Records = () => {
  const { user } = useAuth();

  const isAdmin = user?.role === "admin";

  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState(initialForm);

  const [filters, setFilters] = useState({
    type: "",
    category: "",
  });

  useEffect(() => {
    fetchRecords();
  }, [page]);

  const fetchRecords = async () => {
  try {
    const res = await getRecords({
      page,
      limit: 5,
      ...filters,
    });

    console.log(res);

    setRecords(res.data.records || []);
    setTotalPages(res.data.totalPages || 1);
  } catch (error) {
    console.log(error);
  }
};

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateRecord(editingId, formData);
      } else {
        await createRecord(formData);
      }

      setFormData(initialForm);
      setEditingId(null);

      fetchRecords();
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  const handleEdit = (record) => {
    setEditingId(record._id);

    setFormData({
      amount: record.amount,
      type: record.type,
      category: record.category,
      date: record.date?.split("T")[0],
      note: record.note,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this record?")) return;

    try {
      await deleteRecord(id);
      fetchRecords();
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  const applyFilters = () => {
    setPage(1);
    fetchRecords();
  };

  return (
    <div className="records-page">
      <h1 className="page-title">Financial Records</h1>


      <div className="filter-bar">
        <select
          className="input-field"
          value={filters.type}
          onChange={(e) =>
            setFilters({
              ...filters,
              type: e.target.value,
            })
          }
        >
          <option value="">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <input
          type="text"
          placeholder="Category"
          className="input-field"
          value={filters.category}
          onChange={(e) =>
            setFilters({
              ...filters,
              category: e.target.value,
            })
          }
        />

        <button
          onClick={applyFilters}
          className="primary-btn"
        >
          Apply Filter
        </button>
      </div>

    
      {isAdmin && (
        <form
          onSubmit={handleSubmit}
          className="form-card"
        >
          <h2 className="section-title">
            {editingId
              ? "Update Record"
              : "Create New Record"}
          </h2>

          <div className="form-grid">
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleChange}
              className="input-field"
              required
            />

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="input-field"
            >
              <option value="income">
                Income
              </option>

              <option value="expense">
                Expense
              </option>
            </select>

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className="input-field"
              required
            />

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="input-field"
              required
            />

            <textarea
              name="note"
              placeholder="Write note..."
              value={formData.note}
              onChange={handleChange}
              className="input-field full-width"
              rows="4"
            />
          </div>

          <button className="success-btn">
            {editingId
              ? "Update Record"
              : "Add Record"}
          </button>
        </form>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Type</th>
              <th>Category</th>
              <th>Date</th>
              <th>Note</th>

              {isAdmin && (
                <th>Actions</th>
              )}
            </tr>
          </thead>

          <tbody>
            {records.length > 0 ? (
              records.map((record) => (
                <tr key={record._id}>
                  <td>
                    ₹{record.amount}
                  </td>

                  <td>
                    {record.type}
                  </td>

                  <td>
                    {record.category}
                  </td>

                  <td>
                    {new Date(
                      record.date
                    ).toLocaleDateString()}
                  </td>

                  <td>
                    {record.note}
                  </td>

                  {isAdmin && (
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() =>
                          handleEdit(record)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(record._id)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={
                    isAdmin ? 6 : 5
                  }
                  className="empty-row"
                >
                  No Records Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    
      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() =>
            setPage((prev) => prev - 1)
          }
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() =>
            setPage((prev) => prev + 1)
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Records;
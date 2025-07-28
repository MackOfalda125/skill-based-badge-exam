import React, { useState, useEffect } from "react";
import "./report.css";
import api from "../../api/api.js";

function Reports() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await api.fetchUsers();
        if (result.error) {
          setError(result.error);
        } else {
          setUsers(result.data);
        }
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="main-bg">
        <div className="ellipse"></div>
        <div className="header-bubble">
          <h1 className="title">Reports</h1>
          <p className="subtitle">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="main-bg">
        <div className="ellipse"></div>
        <div className="header-bubble">
          <h1 className="title">Reports</h1>
          <p className="subtitle">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="main-bg">
      {/* Ellipse */}
      <div className="ellipse"></div>

      {/* Header Bubble */}
      <div className="header-bubble">
        <h1 className="title">Reports</h1>
        <p className="subtitle">Total Number of Registered Users: {users.length}</p>
      </div>

      {/* Table */}
      <div className="table-wrap">
        <table className="user-table">
          <thead>
            <tr>
              <th className="th">Name</th>
              <th className="th">Email</th>
              <th className="th">Username</th>
              <th className="th">Phone</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id || index}
                className={index % 2 === 0 ? "row-even" : "row-odd"}
              >
                <td className="td">{user.name}</td>
                <td className="td">{user.email}</td>
                <td className="td">{user.username}</td>
                <td className="td">{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reports;
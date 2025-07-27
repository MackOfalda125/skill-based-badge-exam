import React from "react";
import "./report.css";

const data = [
  { name: "Alice Smith", email: "alice@example.com", username: "alice2025", password: "••••••" },
  { name: "Bob Johnson", email: "bob@example.com", username: "bobbyj", password: "••••••" },
  { name: "Charlie Rose", email: "charlie@example.com", username: "rosecharlie", password: "••••••" },
  { name: "Dana Lee", email: "dana@example.com", username: "lee.d", password: "••••••" },
];

function Reports() {
  return (
    <div className="main-bg">
      {/* Ellipse */}
      <div className="ellipse"></div>

      {/* Header Bubble */}
      <div className="header-bubble">
        <h1 className="title">Reports</h1>
        <p className="subtitle">Total Number of Registered Users: {data.length}</p>
      </div>

      {/* Table */}
      <div className="table-wrap">
        <table className="user-table">
          <thead>
            <tr>
              <th className="th">Name</th>
              <th className="th">Email</th>
              <th className="th">Username</th>
              <th className="th">Password</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "row-even" : "row-odd"}
              >
                <td className="td">{user.name}</td>
                <td className="td">{user.email}</td>
                <td className="td">{user.username}</td>
                <td className="td">{user.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reports;

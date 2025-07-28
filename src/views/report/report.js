import React, { useState, useEffect, useRef } from "react";
import Sidebar from '../../components/sidebar';
import "./report.css";
import api from "../../api/api.js";

function Reports() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

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

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);

  if (loading) {
    return (
      <div className="dashboard-container">
        <Sidebar isOpen={isSidebarOpen} sidebarRef={sidebarRef} />
        
        <div className={`hamburger-container ${!isSidebarOpen ? 'shifted' : ''}`}>
          <button className="hamburger" onClick={toggleSidebar}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>

        <div className={`main ${!isSidebarOpen ? 'main-shifted' : ''}`}>
          <div className="report-container">
            <h1>Reports</h1>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <Sidebar isOpen={isSidebarOpen} sidebarRef={sidebarRef} />
        
        <div className={`hamburger-container ${!isSidebarOpen ? 'shifted' : ''}`}>
          <button className="hamburger" onClick={toggleSidebar}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>

        <div className={`main ${!isSidebarOpen ? 'main-shifted' : ''}`}>
          <div className="report-container">
            <h1>Reports</h1>
            <p>Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Sidebar isOpen={isSidebarOpen} sidebarRef={sidebarRef} />
      
      <div className={`hamburger-container ${!isSidebarOpen ? 'shifted' : ''}`}>
        <button className="hamburger" onClick={toggleSidebar}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>

      <div className={`main ${!isSidebarOpen ? 'main-shifted' : ''}`}>
        <div className="report-container">
          <h1>Reports</h1>
          <p>Total Number of Registered Users: {users.length}</p>

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
      </div>
    </div>
  );
}

export default Reports;
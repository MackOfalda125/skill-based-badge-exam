import React, { useState, useRef, useEffect } from 'react';
import './dashboard.css';

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
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

  return (
    <div className="dashboard-container">
      <div
        className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}
        ref={sidebarRef}
      >
        <h2>Dashboard</h2>
        <a href="#add">Add Record</a>
        <a href="#edit">Edit Record</a>
        <a href="#delete">Delete Record</a>
        <a href="#report">Display All Records</a>
      </div>

      <div className="main">
        <button className="hamburger" onClick={toggleSidebar}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <h1>Welcome to the Dashboard</h1>
        <p>skill-based-badge-exam.</p>
        <p>Select an option from the sidebar to get started.</p>
      </div>
    </div>
  );
};

export default Dashboard;

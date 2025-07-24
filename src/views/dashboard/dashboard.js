import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../../components/sidebar';
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
      <Sidebar isOpen={isSidebarOpen} sidebarRef={sidebarRef} />
      
      <div className="hamburger-container">
        <button className="hamburger" onClick={toggleSidebar}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>

      <div className="main">
        <h1>Welcome to the Dashboard</h1>
        <p>skill-based-badge-exam.</p>
        <p>Select an option from the sidebar to get started.</p>
      </div>
    </div>
  );
};

export default Dashboard;

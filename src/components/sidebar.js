import React from 'react';
import { useNavigate } from 'react-router-dom';
import './sidebar.css';

const Sidebar = ({ isOpen, sidebarRef }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div
      className={`sidebar ${isOpen ? 'open' : 'closed'}`}
      ref={sidebarRef}
    >
      <h2 
        className="sidebar-title"
        onClick={() => handleNavigation('/dashboard')}
      >
        Dashboard
      </h2>
      <button 
        className="sidebar-btn" 
        onClick={() => handleNavigation('/manage')}
      >
        Manage Users
      </button>
      <button 
        className="sidebar-btn" 
        onClick={() => handleNavigation('/report')}
      >
        Display All Users
      </button>
      <button 
        className="sidebar-btn logout-btn" 
        onClick={() => handleNavigation('/')}
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
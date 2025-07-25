import React, { useState, useEffect, useRef } from 'react';
import api from '../../api/api';
import Sidebar from '../../components/sidebar';
import './manage.css';

const Manage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const loadUsers = async () => {
      const { data, error } = await api.fetchUsers();
      if (error) {
        setError(error);
      } else {
        setUsers(data);
      }
      setLoading(false);
    };

    loadUsers();
  }, []);

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

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

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
        <div className="manage-container">
          <h1>Manage Users</h1>
          <div className="users-table">
            <div className="table-header">
              <div className="column">ID</div>
              <div className="column">Name</div>
              <div className="column">Username</div>
              <div className="column">Email</div>
              <div className="column">Actions</div>
            </div>
            <div className="table-body">
              {users.map(user => (
                <div key={user.id} className="table-row">
                  <div className="column">{user.id}</div>
                  <div className="column">{user.name}</div>
                  <div className="column">{user.username}</div>
                  <div className="column">{user.email}</div>
                  <div className="column actions">
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manage;
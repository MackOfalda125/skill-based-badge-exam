import React, { useState, useEffect, useRef } from 'react';
import api from '../../api/api';
import Sidebar from '../../components/sidebar';
import AddUser from './addUser';
import EditUser from './editUser';
import DeleteUser from './deleteUser';
import './manage.css';

const Manage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const sidebarRef = useRef(null);

  const loadUsers = async () => {
    const { data, error } = await api.fetchUsers();
    if (error) {
      setError(error);
    } else {
      setUsers(data);
    }
    setLoading(false);
  };

  useEffect(() => {
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

  const handleAddUser = async (userData) => {
    const { data, error } = await api.addUser(userData);
    if (!error) {
      let newUser = data;
      if (!newUser || !newUser.id) {
        const lastId = users.length > 0 ? users[users.length - 1].id : 0;
        newUser = { ...userData, id: lastId + 1 };
      }
      setUsers([...users, newUser]);
      setIsAddModalOpen(false);
    } else {
      // Optionally handle error (e.g., show a message)
    }
  };

  const handleEditClick = (user) => {
    setUserToEdit(user);
    setIsEditModalOpen(true);
  };

  const handleEditUser = async (updatedUser) => {
    if (updatedUser.id > 10) {
      // Local-only user: update locally, skip API
      setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
      setIsEditModalOpen(false);
      setUserToEdit(null);
    } else {
      // Original user: update via API
      const { data, error } = await api.updateUser(updatedUser.id, updatedUser);
      if (!error) {
        const userData = data || updatedUser;
        setUsers(users.map(u => u.id === updatedUser.id ? userData : u));
        setIsEditModalOpen(false);
        setUserToEdit(null);
      } else {
        // Optionally handle error (e.g., show a message)
      }
    }
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteUser = async (id) => {
    const { error } = await api.deleteUser(id);
    if (!error) {
      setUsers(users.filter(u => u.id !== id));
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
    } else {
      // Optionally handle error (e.g., show a message)
    }
  };

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
          <div className="manage-header">
            <h1>Manage Users</h1>
            <button 
              className="add-user-btn"
              onClick={() => setIsAddModalOpen(true)}
            >
              <span className="plus-icon">+</span>
              Add User
            </button>
          </div>
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
                    <button className="edit-btn" onClick={() => handleEditClick(user)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDeleteClick(user)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <AddUser 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddUser}
      />
      <EditUser
        isOpen={isEditModalOpen}
        onClose={() => { setIsEditModalOpen(false); setUserToEdit(null); }}
        onSave={handleEditUser}
        user={userToEdit}
      />
      <DeleteUser
        isOpen={isDeleteModalOpen}
        onClose={() => { setIsDeleteModalOpen(false); setUserToDelete(null); }}
        onDelete={handleDeleteUser}
        user={userToDelete}
      />
    </div>
  );
};

export default Manage;
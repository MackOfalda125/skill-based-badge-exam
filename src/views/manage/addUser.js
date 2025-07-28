import React, { useState } from 'react';
import './addUser.css';

const AddUser = ({ isOpen, onClose, onSave }) => {
  const [userData, setUserData] = useState({
    name: '',
    username: '',
    email: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSave(userData);
    setUserData({ name: '', username: '', email: '' });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New User</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={userData.name}
              onChange={(e) => setUserData({...userData, name: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={userData.username}
              onChange={(e) => setUserData({...userData, username: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={userData.email}
              onChange={(e) => setUserData({...userData, email: e.target.value})}
              required
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
import React, { useState, useEffect } from 'react';
import './addUser.css';

const EditUser = ({ isOpen, onClose, onSave, user }) => {
  const [userData, setUserData] = useState({ name: '', username: '', email: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name || '',
        username: user.username || '',
        email: user.email || ''
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSave({ ...user, ...userData });
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit User</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="edit-name">Name:</label>
            <input
              type="text"
              id="edit-name"
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="edit-username">Username:</label>
            <input
              type="text"
              id="edit-username"
              value={userData.username}
              onChange={(e) => setUserData({ ...userData, username: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="edit-email">Email:</label>
            <input
              type="email"
              id="edit-email"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              required
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="save-btn" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;

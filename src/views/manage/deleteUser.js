import React, { useState } from 'react';
import api from '../../api/api';
import './addUser.css';

const DeleteUser = ({ isOpen, onClose, onDelete, user }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen || !user) return null;

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    const { error } = await api.deleteUser(user.id);
    setLoading(false);
    if (error) {
      setError(error);
    } else {
      onDelete(user.id);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this user?</p>
        <div className="form-group">
          <strong>Name:</strong> {user.name}<br />
          <strong>Username:</strong> {user.username}<br />
          <strong>Email:</strong> {user.email}
        </div>
        {error && <div className="error">{error}</div>}
        <div className="modal-actions">
          <button type="button" className="cancel-btn" onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button type="button" className="save-btn" onClick={handleDelete} disabled={loading}>
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;

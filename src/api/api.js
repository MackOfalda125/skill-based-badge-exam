import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

const api = {
  // ---------- GET: Fetch all users ----------
  fetchUsers: async () => {
    try {
      const res = await axios.get(API_URL);
      return { data: res.data, error: null };
    } catch (err) {
      return { data: null, error: err.message || 'Failed to fetch users' };
    }
  },

  // ---------- POST: Add new user ----------
  addUser: async (name) => {
    try {
      const res = await axios.post(API_URL, { name });
      return { data: res.data, error: null };
    } catch (err) {
      return { data: null, error: err.message || 'Failed to add user' };
    }
  },

  // ---------- PUT: Update user ----------
  updateUser: async (id, name) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, { name });
      return { data: res.data, error: null };
    } catch (err) {
      return { data: null, error: err.message || 'Failed to update user' };
    }
  },

  // ---------- DELETE: Delete user ----------
  deleteUser: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return { data: true, error: null };
    } catch (err) {
      return { data: null, error: err.message || 'Failed to delete user' };
    }
  },
};

export default api;

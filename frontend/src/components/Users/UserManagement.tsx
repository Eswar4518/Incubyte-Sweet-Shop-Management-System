import React, { useState, useEffect } from 'react';
import { getAllUsers, createUser, deleteUser, updateUserRole, User } from '../../api/userApi';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'customer' as 'admin' | 'customer'
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error: any) {
      console.error('Failed to load users:', error);
      if (error.response?.status === 401) {
        alert('Access denied. Admin privileges required.');
      } else {
        alert('Failed to load users. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser(formData);
      setFormData({ username: '', email: '', password: '', role: 'customer' });
      setShowForm(false);
      loadUsers();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to create user');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await deleteUser(userId);
      loadUsers();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to delete user');
    }
  };

  const handleRoleChange = async (userId: string, newRole: 'admin' | 'customer') => {
    try {
      await updateUserRole(userId, newRole);
      loadUsers();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to update role');
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading users...</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">👥 User Management</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className=" text-gray-900 px-6 py-3"
        >
          {showForm ? '❌ Cancel' : '➕ Add User'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreateUser} className="bg-gray-50 p-6 rounded-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              className="form-input-enhanced"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="form-input-enhanced"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="form-input-enhanced"
              required
            />
            <select
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value as 'admin' | 'customer'})}
              className="form-input-enhanced"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="mt-4 px-4 py-2 rounded-lg bg-gray-200 text-gray-900 font-semibold shadow-sm hover:bg-gray-300 hover:shadow-md transition-colors transition-shadow duration-200"
          >
            Create User
          </button>

        </form>
      )}

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-gray-900">
              <th className="px-4 py-3 text-left">Username</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id || user.id} className="border-b bg-gray-200 hover:bg-gray-300 text-gray-900">
                <td className="px-4 py-3 font-medium">{user.username}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id || user.id || '', e.target.value as 'admin' | 'customer')}
                    className="px-3 py-1 border roundedbg-gray-200 hover:bg-gray-300 text-gray-900"
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleDeleteUser(user._id || user.id || '')}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
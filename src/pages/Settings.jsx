import React, { useState } from 'react';
import '../styles/Settings.css';

const Settings = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [settings, setSettings] = useState([
    {
      id: 1,
      name: 'School Settings',
      description: 'Configure school-related settings',
      lastModified: '2024-03-15',
      status: 'active'
    },
    {
      id: 2,
      name: 'User Settings',
      description: 'Manage user preferences and permissions',
      lastModified: '2024-03-14',
      status: 'active'
    },
    {
      id: 3,
      name: 'System Settings',
      description: 'System-wide configuration options',
      lastModified: '2024-03-13',
      status: 'inactive'
    }
  ]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredSettings = settings.filter(setting =>
    setting.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    setting.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredSettings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSettings = filteredSettings.slice(startIndex, endIndex);

  const handleAddSetting = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newSetting = {
      id: settings.length + 1,
      name: formData.get('name'),
      description: formData.get('description'),
      lastModified: new Date().toISOString().split('T')[0],
      status: formData.get('status')
    };
    setSettings([...settings, newSetting]);
    setShowModal(false);
  };

  return (
    <div className="settings">
      <div className="header">
        <h1>Settings Management</h1>
        <button className="add-btn" onClick={() => setShowModal(true)}>
          Add Setting
        </button>
      </div>

      <div className="content-box">
        <div className="filters">
          <div className="filter-group">
            <label>Status:</label>
            <select>
              <option value="">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Category:</label>
            <select>
              <option value="">All</option>
              <option value="school">School</option>
              <option value="user">User</option>
              <option value="system">System</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Last Modified:</label>
            <select>
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
          </div>
        </div>

        <div className="settings-table">
          <h2>Settings List</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Last Modified</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentSettings.map(setting => (
                <tr key={setting.id}>
                  <td>{setting.name}</td>
                  <td>{setting.description}</td>
                  <td>{setting.lastModified}</td>
                  <td>
                    <span className={`status ${setting.status}`}>
                      {setting.status.charAt(0).toUpperCase() + setting.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <button className="action-btn">Edit</button>
                    <button className="action-btn">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Setting</h2>
            <form onSubmit={handleAddSetting}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" name="name" required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea name="description" required />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select name="status" required>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="modal-buttons">
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings; 
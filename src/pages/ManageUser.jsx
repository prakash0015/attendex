import React, { useState } from 'react';
import '../styles/ManageUser.css';

function ManageUser() {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([
    { id: '001', name: 'John Smith', email: 'john@schoolxyz.com', role: 'Admin', school: 'School XYZ', status: 'Active' },
    { id: '002', name: 'Mary Johnson', email: 'mary@lincoln.edu', role: 'Teacher', school: 'Lincoln High', status: 'Active' },
    { id: '003', name: 'Robert Brown', email: 'robert@global.edu', role: 'Staff', school: 'Global Academy', status: 'Active' },
    { id: '004', name: 'Lisa Wong', email: 'lisa@tech.edu', role: 'Teacher', school: 'Tech High', status: 'Active' },
    { id: '005', name: 'David Miller', email: 'david@horizon.edu', role: 'Staff', school: 'Horizon Academy', status: 'Pending' }
  ]);

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    role: 'Teacher',
    school: '',
    status: 'Active'
  });

  const usersPerPage = 5;
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.school.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const displayedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  const handleOpenModal = () => {
    const newId = String(users.length + 1).padStart(3, '0');
    setFormData({ ...formData, id: newId });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      id: '',
      name: '',
      email: '',
      role: 'Teacher',
      school: '',
      status: 'Active'
    });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id.replace('newUser', '').toLowerCase()]: value });
  };

  const handleSubmit = () => {
    const { name, email, role, school, status } = formData;

    if (!name || !email || !school) {
      alert('Please fill in all required fields');
      return;
    }

    const newUser = {
      id: formData.id,
      name,
      email,
      role,
      school,
      status
    };

    setUsers([...users, newUser]);
    handleCloseModal();
  };

  const handlePageChange = (page) => {
    if (page === 'previous' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (page === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (typeof page === 'number') {
      setCurrentPage(page);
    }
  };

  return (
    <div className="manage-user">
      <div className="header">
        <h1>Manage Users</h1>
      </div>
      
      <div className="content-box">
        <div className="users-header">
          <h2>Users List</h2>
          <button className="add-btn" onClick={handleOpenModal}>+ Add New User</button>
        </div>
        
        <div className="search-container">
          <input
            type="text"
            placeholder="Search users by name, email, or school..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>School</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.school}</td>
                <td>{user.status}</td>
                <td>
                  <button className="action-btn">Edit</button>
                  <button className="action-btn delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button onClick={() => handlePageChange('previous')}>Previous</button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              className={currentPage === i + 1 ? 'active' : ''}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={() => handlePageChange('next')}>Next</button>
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New User</h2>
            <div className="form-group">
              <label htmlFor="newUserId">User ID</label>
              <input
                type="text"
                id="newUserId"
                value={formData.id}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="newUserName">Name</label>
              <input
                type="text"
                id="newUserName"
                placeholder="Enter user name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="newUserEmail">Email</label>
              <input
                type="email"
                id="newUserEmail"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="newUserRole">Role</label>
              <select
                id="newUserRole"
                value={formData.role}
                onChange={handleInputChange}
              >
                <option value="Admin">Admin</option>
                <option value="Teacher">Teacher</option>
                <option value="Staff">Staff</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="newUserSchool">School</label>
              <input
                type="text"
                id="newUserSchool"
                placeholder="Enter school name"
                value={formData.school}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="newUserStatus">Status</label>
              <select
                id="newUserStatus"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={handleCloseModal}>Cancel</button>
              <button className="save-btn" onClick={handleSubmit}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageUser; 
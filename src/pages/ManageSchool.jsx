import React, { useState } from 'react';
import '../styles/ManageSchool.css';

function ManageSchool() {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [schools, setSchools] = useState([
    { id: '001', name: 'School XYZ', location: 'New York, USA', admin: 'John Smith', mobile: '+1 234-567-8901', password: '001123', subscription: 'Premium', status: 'Active' },
    { id: '002', name: 'Lincoln High', location: 'Boston, USA', admin: 'Mary Johnson', mobile: '+1 234-567-8902', password: '002123', subscription: 'Basic', status: 'Active' },
    { id: '003', name: 'Global Academy', location: 'London, UK', admin: 'Robert Brown', mobile: '+44 20-1234-5678', password: '003123', subscription: 'Premium', status: 'Active' },
    { id: '004', name: 'Tech High', location: 'San Francisco, USA', admin: 'Lisa Wong', mobile: '+1 234-567-8904', password: '004123', subscription: 'Enterprise', status: 'Active' },
    { id: '005', name: 'Horizon Academy', location: 'Toronto, Canada', admin: 'David Miller', mobile: '+1 647-123-4567', password: '005123', subscription: 'Basic', status: 'Pending' }
  ]);

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    location: '',
    admin: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    subscription: 'Basic',
    status: 'Active'
  });

  const schoolsPerPage = 5;
  const filteredSchools = schools.filter(school =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.admin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredSchools.length / schoolsPerPage);
  const startIndex = (currentPage - 1) * schoolsPerPage;
  const displayedSchools = filteredSchools.slice(startIndex, startIndex + schoolsPerPage);

  const handleOpenModal = () => {
    const newId = String(schools.length + 1).padStart(3, '0');
    setFormData({ ...formData, id: newId });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      id: '',
      name: '',
      location: '',
      admin: '',
      mobile: '',
      password: '',
      confirmPassword: '',
      subscription: 'Basic',
      status: 'Active'
    });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id.replace('newSchool', '').toLowerCase()]: value });
  };

  const handleSubmit = () => {
    const { name, location, admin, mobile, password, confirmPassword, subscription, status } = formData;

    if (!name || !location || !admin || !mobile || !password || !confirmPassword) {
      alert('Please fill in all required fields');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const newSchool = {
      id: formData.id,
      name,
      location,
      admin,
      mobile,
      password,
      subscription,
      status
    };

    setSchools([...schools, newSchool]);
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
    <div className="manage-school">
      <div className="header">
        <h1>Manage Schools</h1>
      </div>
      
      <div className="content-box">
        <div className="schools-header">
          <h2>Schools List</h2>
          <button className="add-btn" onClick={handleOpenModal}>+ Add New School</button>
        </div>
        
        <div className="search-container">
          <input
            type="text"
            placeholder="Search schools by name, location, or admin..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <table>
          <thead>
            <tr>
              <th>School ID</th>
              <th>School Name</th>
              <th>Location</th>
              <th>Admin</th>
              <th>Mobile No.</th>
              <th>Password</th>
              <th>Subscription</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedSchools.map((school) => (
              <tr key={school.id}>
                <td>{school.id}</td>
                <td>{school.name}</td>
                <td>{school.location}</td>
                <td>{school.admin}</td>
                <td>{school.mobile}</td>
                <td>{'•'.repeat(6)}</td>
                <td>{school.subscription}</td>
                <td>{school.status}</td>
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
            <h2>Add New School</h2>
            <div className="form-group">
              <label htmlFor="newSchoolId">School ID</label>
              <input
                type="text"
                id="newSchoolId"
                value={formData.id}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="newSchoolName">School Name</label>
              <input
                type="text"
                id="newSchoolName"
                placeholder="Enter school name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="newSchoolLocation">Location</label>
              <input
                type="text"
                id="newSchoolLocation"
                placeholder="Enter location"
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="newSchoolAdmin">Admin Name</label>
              <input
                type="text"
                id="newSchoolAdmin"
                placeholder="Enter admin name"
                value={formData.admin}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="newSchoolMobile">Mobile Number</label>
              <input
                type="text"
                id="newSchoolMobile"
                placeholder="Enter mobile number"
                value={formData.mobile}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="newSchoolPassword">Password</label>
              <input
                type="password"
                id="newSchoolPassword"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="newSchoolConfirmPassword">Confirm Password</label>
              <input
                type="password"
                id="newSchoolConfirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="newSchoolSubscription">Subscription Plan</label>
              <select
                id="newSchoolSubscription"
                value={formData.subscription}
                onChange={handleInputChange}
              >
                <option value="Basic">Basic</option>
                <option value="Premium">Premium</option>
                <option value="Enterprise">Enterprise</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="newSchoolStatus">Status</label>
              <select
                id="newSchoolStatus"
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

export default ManageSchool; 
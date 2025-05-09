import React, { useState } from 'react';
import {
  School as SchoolIcon,
  People as PeopleIcon,
  TrendingUp as TrendingUpIcon,
  CreditCard as CreditCardIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  ArrowUpward as ArrowUpwardIcon
} from '@mui/icons-material';
import '../styles/Dashboard.css';

function Dashboard() {
  const [showLogout, setShowLogout] = useState(false);

  const cards = [
    {
      title: 'Total Schools',
      value: '256',
      change: '12',
      icon: <SchoolIcon />,
      color: 'blue'
    },
    {
      title: 'Active Users',
      value: '12,543',
      change: '8',
      icon: <PeopleIcon />,
      color: 'green'
    },
    {
      title: 'Platform Engagement',
      value: '78%',
      change: '5',
      icon: <TrendingUpIcon />,
      color: 'orange'
    },
    {
      title: 'Active Subscriptions',
      value: '230',
      change: '9',
      icon: <CreditCardIcon />,
      color: 'purple'
    }
  ];

  const schoolRequests = [
    {
      name: 'Springfield High School',
      location: 'Springfield, IL',
      contact: 'John Smith',
      date: 'April 1, 2025',
      status: 'pending'
    },
    {
      name: 'Oak Ridge Elementary',
      location: 'Oak Ridge, TN',
      contact: 'Sarah Johnson',
      date: 'March 30, 2025',
      status: 'approved'
    },
    {
      name: 'Westview Academy',
      location: 'Portland, OR',
      contact: 'Michael Davis',
      date: 'March 28, 2025',
      status: 'pending'
    },
    {
      name: 'Riverdale High',
      location: 'Riverdale, NY',
      contact: 'Emily Wilson',
      date: 'March 25, 2025',
      status: 'approved'
    }
  ];

  return (
    <div className="dashboard">
      <div className="header">
        <div className="search-bar">
          <SearchIcon />
          <input type="text" placeholder="Search..." />
        </div>
        <div className="user-profile" onClick={() => setShowLogout(!showLogout)}>
          <div className="notification">
            <NotificationsIcon />
            <span className="badge">1</span>
          </div>
          <div className="user-avatar">SA</div>
          <span>Super Admin</span>
          <div className={`logout-dropdown ${showLogout ? 'active' : ''}`}>
            <ul>
              <li><a href="#profile">Profile</a></li>
              <li><a href="#logout">Logout</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="dashboard-cards">
        {cards.map((card, index) => (
          <div key={index} className="card">
            <div className="card-header">{card.title}</div>
            <div className="card-value">{card.value}</div>
            <div className="card-footer">
              <ArrowUpwardIcon />
              {card.change}% from last month
              <div className="card-icon">
                <div className={`icon-bg ${card.color}`}>
                  {card.icon}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="tabs">
        <div className="tab active">School Requests</div>
      </div>

      <div className="table-section">
        <div className="table-heading">
          <h2>School Registration Requests</h2>
        </div>
        <table>
          <thead>
            <tr>
              <th>School Name</th>
              <th>Location</th>
              <th>Contact Person</th>
              <th>Submitted On</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {schoolRequests.map((school, index) => (
              <tr key={index}>
                <td>{school.name}</td>
                <td>{school.location}</td>
                <td>{school.contact}</td>
                <td>{school.date}</td>
                <td>
                  <span className={`status ${school.status}`}>
                    {school.status.charAt(0).toUpperCase() + school.status.slice(1)}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    {school.status === 'pending' ? (
                      <>
                        <button className="btn btn-approve">Approve</button>
                        <button className="btn btn-reject">Reject</button>
                      </>
                    ) : (
                      <>
                        <button className="btn btn-view">View</button>
                        <button className="btn btn-disable">Disable</button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard; 
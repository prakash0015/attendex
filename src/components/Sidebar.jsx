import React from 'react';
import { NavLink } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import PaymentIcon from '@mui/icons-material/Payment';
import SettingsIcon from '@mui/icons-material/Settings';
import '../styles/Sidebar.css';

function Sidebar() {
  const menuItems = [
    { path: '/', icon: <DashboardIcon />, text: 'Dashboard' },
    { path: '/manage-school', icon: <SchoolIcon />, text: 'Manage School' },
    { path: '/manage-user', icon: <PeopleIcon />, text: 'Manage User' },
    { path: '/engagement', icon: <BarChartIcon />, text: 'Engagement' },
    { path: '/payment', icon: <PaymentIcon />, text: 'Payment' },
    { path: '/settings', icon: <SettingsIcon />, text: 'Settings' },
  ];

  return (
    <div className="sidebar">
      <div className="logo">
        <SchoolIcon />
        <span>AttendEx</span>
      </div>
      <ul className="menu">
        {menuItems.map((item) => (
          <li key={item.path} className="menu-item">
            <NavLink
              to={item.path}
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              {item.icon}
              <span>{item.text}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar; 
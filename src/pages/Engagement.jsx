import React, { useState } from 'react';
import '../styles/Engagement.css';

function Engagement() {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedSchool, setSelectedSchool] = useState('all');

  const engagementData = {
    monthly: {
      activeUsers: 12543,
      totalLogins: 45678,
      averageTime: '45 mins',
      completionRate: '78%'
    },
    weekly: {
      activeUsers: 5432,
      totalLogins: 18765,
      averageTime: '38 mins',
      completionRate: '82%'
    },
    daily: {
      activeUsers: 1234,
      totalLogins: 5432,
      averageTime: '32 mins',
      completionRate: '85%'
    }
  };

  const schools = [
    { id: 'all', name: 'All Schools' },
    { id: '001', name: 'School XYZ' },
    { id: '002', name: 'Lincoln High' },
    { id: '003', name: 'Global Academy' },
    { id: '004', name: 'Tech High' },
    { id: '005', name: 'Horizon Academy' }
  ];

  const currentData = engagementData[selectedPeriod];

  return (
    <div className="engagement">
      <div className="header">
        <h1>Engagement Analytics</h1>
      </div>

      <div className="content-box">
        <div className="filters">
          <div className="filter-group">
            <label>Time Period:</label>
            <select 
              value={selectedPeriod} 
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <div className="filter-group">
            <label>School:</label>
            <select 
              value={selectedSchool} 
              onChange={(e) => setSelectedSchool(e.target.value)}
            >
              {schools.map(school => (
                <option key={school.id} value={school.id}>
                  {school.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Active Users</h3>
            <div className="stat-value">{currentData.activeUsers.toLocaleString()}</div>
            <div className="stat-trend positive">+12% from last period</div>
          </div>
          <div className="stat-card">
            <h3>Total Logins</h3>
            <div className="stat-value">{currentData.totalLogins.toLocaleString()}</div>
            <div className="stat-trend positive">+8% from last period</div>
          </div>
          <div className="stat-card">
            <h3>Average Time Spent</h3>
            <div className="stat-value">{currentData.averageTime}</div>
            <div className="stat-trend positive">+5% from last period</div>
          </div>
          <div className="stat-card">
            <h3>Completion Rate</h3>
            <div className="stat-value">{currentData.completionRate}</div>
            <div className="stat-trend positive">+3% from last period</div>
          </div>
        </div>

        <div className="engagement-chart">
          <h2>Engagement Trends</h2>
          <div className="chart-placeholder">
            <p>Chart visualization will be implemented here</p>
          </div>
        </div>

        <div className="engagement-table">
          <h2>Top Performing Schools</h2>
          <table>
            <thead>
              <tr>
                <th>School Name</th>
                <th>Active Users</th>
                <th>Total Logins</th>
                <th>Avg. Time</th>
                <th>Completion Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>School XYZ</td>
                <td>2,543</td>
                <td>8,765</td>
                <td>52 mins</td>
                <td>85%</td>
              </tr>
              <tr>
                <td>Lincoln High</td>
                <td>2,123</td>
                <td>7,432</td>
                <td>48 mins</td>
                <td>82%</td>
              </tr>
              <tr>
                <td>Global Academy</td>
                <td>1,987</td>
                <td>6,543</td>
                <td>45 mins</td>
                <td>80%</td>
              </tr>
              <tr>
                <td>Tech High</td>
                <td>1,765</td>
                <td>5,987</td>
                <td>42 mins</td>
                <td>78%</td>
              </tr>
              <tr>
                <td>Horizon Academy</td>
                <td>1,543</td>
                <td>5,432</td>
                <td>40 mins</td>
                <td>75%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Engagement; 
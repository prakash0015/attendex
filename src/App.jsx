import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ManageSchool from './pages/ManageSchool';
import ManageUser from './pages/ManageUser';
import Engagement from './pages/Engagement';
import Payment from './pages/Payment';
import Settings from './pages/Settings';
import './styles/App.css';

function App() {
  return (
    <div className="app">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/manage-school" element={<ManageSchool />} />
          <Route path="/manage-user" element={<ManageUser />} />
          <Route path="/engagement" element={<Engagement />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

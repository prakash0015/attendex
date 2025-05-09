import React, { useState } from 'react';
import '../styles/Payment.css';

const Payment = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [payments, setPayments] = useState([
    {
      id: 1,
      school: 'ABC School',
      amount: 5000,
      date: '2024-03-15',
      status: 'completed',
      method: 'Credit Card'
    },
    {
      id: 2,
      school: 'XYZ Academy',
      amount: 3000,
      date: '2024-03-14',
      status: 'pending',
      method: 'Bank Transfer'
    },
    {
      id: 3,
      school: '123 High School',
      amount: 4000,
      date: '2024-03-13',
      status: 'failed',
      method: 'PayPal'
    }
  ]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredPayments = payments.filter(payment =>
    payment.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.method.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPayments = filteredPayments.slice(startIndex, endIndex);

  const handleAddPayment = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newPayment = {
      id: payments.length + 1,
      school: formData.get('school'),
      amount: parseFloat(formData.get('amount')),
      date: formData.get('date'),
      status: formData.get('status'),
      method: formData.get('method')
    };
    setPayments([...payments, newPayment]);
    setShowModal(false);
  };

  return (
    <div className="payment">
      <div className="header">
        <h1>Payment Management</h1>
        <button className="add-btn" onClick={() => setShowModal(true)}>
          Add Payment
        </button>
      </div>

      <div className="content-box">
        <div className="filters">
          <div className="filter-group">
            <label>Status:</label>
            <select>
              <option value="">All</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Payment Method:</label>
            <select>
              <option value="">All</option>
              <option value="credit-card">Credit Card</option>
              <option value="bank-transfer">Bank Transfer</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Date Range:</label>
            <select>
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Revenue</h3>
            <div className="stat-value">$12,000</div>
            <div className="stat-trend positive">
              <span>↑ 12%</span>
              <span>vs last month</span>
            </div>
          </div>
          <div className="stat-card">
            <h3>Pending Payments</h3>
            <div className="stat-value">$3,000</div>
            <div className="stat-trend negative">
              <span>↓ 5%</span>
              <span>vs last month</span>
            </div>
          </div>
          <div className="stat-card">
            <h3>Failed Payments</h3>
            <div className="stat-value">$1,000</div>
            <div className="stat-trend positive">
              <span>↓ 8%</span>
              <span>vs last month</span>
            </div>
          </div>
        </div>

        <div className="payment-table">
          <h2>Recent Payments</h2>
          <table>
            <thead>
              <tr>
                <th>School</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th>Method</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPayments.map(payment => (
                <tr key={payment.id}>
                  <td>{payment.school}</td>
                  <td>${payment.amount}</td>
                  <td>{payment.date}</td>
                  <td>
                    <span className={`status ${payment.status}`}>
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </span>
                  </td>
                  <td>{payment.method}</td>
                  <td>
                    <button className="action-btn">View</button>
                    <button className="action-btn">Edit</button>
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
            <h2>Add New Payment</h2>
            <form onSubmit={handleAddPayment}>
              <div className="form-group">
                <label>School</label>
                <input type="text" name="school" required />
              </div>
              <div className="form-group">
                <label>Amount</label>
                <input type="number" name="amount" required />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input type="date" name="date" required />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select name="status" required>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
              <div className="form-group">
                <label>Payment Method</label>
                <select name="method" required>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="PayPal">PayPal</option>
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

export default Payment; 
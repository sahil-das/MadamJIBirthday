// src/pages/AdminDashboard.jsx
import "../styles/AdminDashboard.css";
import React, { useEffect, useState } from 'react';

const AdminDashboard = ({ token }) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch('https://visitor-traker.onrender.com/api/admin/activity', {
          headers: { Authorization: token }
        });
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setLogs(data);
      } catch (err) {
        setLogs([]);
      }
    };
    if (token) fetchLogs();
  }, [token]);

  return (
    <div className="dashboard-bg">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <span className="icon" title="Dashboard">📊</span>
          <h2>User Activity Log</h2>
        </div>
        {logs.length === 0 ? (
          <div style={{padding: '2em', color: '#888', textAlign: 'center'}}>No activity logs found or failed to fetch data.</div>
        ) : (
          <div className="dashboard-table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Page</th>
                  <th>Time (s)</th>
                  <th>Browser</th>
                  <th>OS</th>
                  <th>Device Type</th>
                  <th>Device Model</th>
                  <th>Device Vendor</th>
                  <th>City</th>
                  <th>Country</th>
                  <th>IP</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, i) => (
                  <tr key={i}>
                    <td>{log.page}</td>
                    <td>{log.timeSpent}</td>
                    <td>{log.browser}</td>
                    <td>{log.os}</td>
                    <td>{log.deviceType}</td>
                    <td>{log.deviceModel}</td>
                    <td>{log.deviceVendor}</td>
                    <td>{log.city}</td>
                    <td>{log.country}</td>
                    <td>{log.ip}</td>
                    <td>{new Date(log.timestamp).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

// src/components/AdminLogin.jsx
import React, { useState } from 'react';
import "../styles/AdminLogin.css";
import { useNavigate } from 'react-router-dom';

export default function AdminLogin({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('https://visitor-traker.onrender.com/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        setToken(data.token);
        navigate('/admin/dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error');
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-logo" title="Admin Login">🔒</div>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <div style={{ position: 'relative' }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <span
            className="show-password"
            onClick={() => setShowPassword(v => !v)}
            title={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={0}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setShowPassword(v => !v); }}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? '🙈' : '👁️'}
          </span>
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? <span className="loading-spinner" style={{display:'inline-block',verticalAlign:'middle',width:'1.2em',height:'1.2em',border:'2.5px solid #ff69b4',borderTop:'2.5px solid #fff',borderRadius:'50%',animation:'spin 0.7s linear infinite'}}></span> : 'Login'}
        </button>
      </form>
      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

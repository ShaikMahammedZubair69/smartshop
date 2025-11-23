import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Try to register the user. Backend endpoint kept minimal and unchanged.
      const user={
        name: name,
        password: password,
        email: email 
      }
      await axios.post('http://localhost:8081/auth/register', user);

      // On success, navigate to login
      navigate('/login');
    } catch (err) {
      console.error('Registration failed:', err);
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5 col-lg-4">
            <div className="card shadow-lg" style={{ borderRadius: '15px', overflow: 'hidden', border: 'none' }}>
              <div style={{ background: 'linear-gradient(135deg, #0066cc 0%, #0052a3 100%)', padding: '2rem 1.5rem', color: 'white', textAlign: 'center' }}>
                <h2 style={{ margin: 0, fontSize: '2.5em' }}>📝</h2>
                <h3 style={{ margin: '0.5rem 0 0 0', fontWeight: '700' }}>Create Account</h3>
                <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9 }}>Join SmartShop — it only takes a minute</p>
              </div>

              <div className="card-body" style={{ padding: '2rem' }}>
                {error && (
                  <div className="alert alert-danger" style={{ borderRadius: '10px' }}>{error}</div>
                )}

                <form onSubmit={handleRegister}>
                  <div className="mb-3">
                    <label className="form-label">👤 Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Your full name"
                      style={{ borderRadius: '10px' }}
                      disabled={loading}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">📧 Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="you@example.com"
                      style={{ borderRadius: '10px' }}
                      disabled={loading}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label">🔑 Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Create a password"
                      style={{ borderRadius: '10px' }}
                      disabled={loading}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={loading}
                    style={{ padding: '0.8rem', fontWeight: '600', fontSize: '1em', borderRadius: '10px' }}
                  >
                    {loading ? '⏳ Creating account...' : '✨ Create Account'}
                  </button>
                </form>

                <div className="text-center mt-4" style={{ borderTop: '1px solid #eee', paddingTop: '1.5rem' }}>
                  <p style={{ margin: 0, color: '#666' }}>
                    Already have an account?
                    <a href="/login" style={{ marginLeft: '0.5rem', textDecoration: 'none', fontWeight: '600' }}>
                      Log in
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

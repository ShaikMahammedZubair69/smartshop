import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userOb={
        username:username,
        password:password
      }
      console.log("Login Payload:", userOb);
      const response = await axios.post('http://localhost:8081/auth/token', userOb )
      
      const token = response.data;
      const userObj = { sub: username };

      dispatch(loginSuccess({
        token: token,
        user: userObj
      }));

      navigate('/');
      
    } catch (err) {
      console.error("Login Failed:", err);
      setError('❌ Invalid Username or Password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5 col-lg-4">
            <div 
              className="card shadow-lg"
              style={{ borderRadius: '15px', overflow: 'hidden', border: 'none' }}
            >
              <div 
                style={{
                  background: 'linear-gradient(135deg, #0066cc 0%, #0052a3 100%)',
                  padding: '2rem 1.5rem',
                  color: 'white',
                  textAlign: 'center'
                }}
              >
                <h2 style={{ margin: 0, fontSize: '2.5em' }}>🔐</h2>
                <h3 style={{ margin: '0.5rem 0 0 0', fontWeight: '700' }}>Welcome Back</h3>
                <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9 }}>Login to your account</p>
              </div>
              
              <div className="card-body" style={{ padding: '2rem' }}>
                {error && (
                  <div className="alert alert-danger" style={{ borderRadius: '10px' }}>
                    {error}
                  </div>
                )}

                <form onSubmit={handleLogin}>
                  <div className="mb-4">
                    <label className="form-label">👤 Username</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      disabled={loading}
                      required 
                      placeholder="Enter your username"
                      style={{ borderRadius: '10px' }}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label">🔑 Password</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                      required 
                      placeholder="Enter your password"
                      style={{ borderRadius: '10px' }}
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary w-100"
                    disabled={loading}
                    style={{ 
                      padding: '0.8rem',
                      fontWeight: '600',
                      fontSize: '1em',
                      borderRadius: '10px'
                    }}
                  >
                    {loading ? '⏳ Logging in...' : '🚀 Login'}
                  </button>
                </form>

                <div className="text-center mt-4" style={{ borderTop: '1px solid #eee', paddingTop: '1.5rem' }}>
                  <p style={{ margin: 0, color: '#666' }}>
                    Don't have an account? 
                    <a href="/register" style={{ marginLeft: '0.5rem', textDecoration: 'none', fontWeight: '600' }}>
                      Sign up here
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

export default Login;
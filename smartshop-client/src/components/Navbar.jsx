import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const totalQuantity = useSelector((state) => state.cart?.totalQuantity ?? 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <span style={{ fontSize: '1.5em' }}>🛍️</span> SmartShop
        </Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item me-2">
              <Link className="nav-link text-warning fw-bold" to="/cart">
                🛒 Cart <span className="badge bg-danger">{totalQuantity}</span>
              </Link>
            </li>
            <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">My Orders</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/admin">Admin Panel</Link>
            </li>
            {!isAuthenticated ? (
              <>
                <li className="nav-item me-2">
                  <Link className="nav-link" to="/login">🔐 Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">📝 Register</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item me-2">
                  <span className="nav-link text-light">
                    👤 {user?.sub}
                  </span>
                </li>
                <li className="nav-item">
                  <button 
                    className="btn btn-danger btn-sm" 
                    onClick={() => dispatch(logout())}
                    style={{ borderRadius: '8px' }}
                  >
                    🚪 Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
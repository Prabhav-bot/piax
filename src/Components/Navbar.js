import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Film } from 'lucide-react';

function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar-container">
      <Link to="/" className="nav-logo">
        <Film size={24} className="logo-icon" style={{ color: '#a855f7' }} />
        <span>PAIX MoodSpace</span>
      </Link>
      
      <div className="nav-links">
        <Link to="/" className={`nav-link ${isActive('/')}`}>
          Home
        </Link>
        <Link to="/about" className={`nav-link ${isActive('/about')}`}>
          About
        </Link>
        <Link to="/contact" className={`nav-link ${isActive('/contact')}`}>
          Contact
        </Link>
        <Link to="/signup">
          <button className="signup-btn">
            Sign In
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
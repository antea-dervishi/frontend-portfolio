
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">RESTAURANT</Link>
      </div>
      <div className="navbar-right">
        <Link to="/favorites" className="navbar-favorite">
          <FontAwesomeIcon icon={faHeart} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar w-50">
      <div className="overlay">
        <h1 className="title">MUSIC DB</h1>
      </div>
      <img src="/images/raw/Girls-Listen-Music_0.jpg" alt="Music Background" className="navbar-image" />
    </nav>
  );
};

export default Navbar;

import React, { useState } from 'react';
import './navbar.css'; // Import the CSS file

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="container">

        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          <a href="#home" className="nav-link">
            Details and Files
          </a>
          <a href="#about" className="nav-link">
            PV / Visits
          </a>
          <a href="#contact" className="nav-link">
            Finance
          </a>
        </div>

       
      </div>
    </nav>
  );
};

export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import './Navbar.css'; // Import CSS file for styling
import Metamask from '../metmask/Metamask';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Metamask/>
        </li>
        <li className="navbar-item">
          <Link to="/registration">Registration</Link>
        </li>
        <li className="navbar-item">
          <Link to="/resolve">Resolve Complaints</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

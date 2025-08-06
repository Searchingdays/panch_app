import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link className='nav-link' to="/">Home</Link>
      <Link className='nav-link' to="/general">General</Link>
      <Link className='nav-link' to="/api/signup">Signup</Link>
      <Link className='nav-link' to="/api/login">Login</Link>
    </nav>
  );
}

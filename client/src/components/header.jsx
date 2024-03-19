import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
  const location = useLocation();

  return (
    <header className="fixed-top bg-light">
      <div className="container">
        <h1 className="text-center py-3">Budgeting</h1>
      </div>
    </header>
  );
}

export default Header;

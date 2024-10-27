import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg p-5">
      <h2 className="text-2xl font-bold text-white">PasteApp</h2>
      <div className="flex gap-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive 
              ? "text-white border-b-2 border-white pb-1"
              : "text-gray-200 hover:text-white transition duration-200"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/pastes"
          className={({ isActive }) =>
            isActive 
              ? "text-white border-b-2 border-white pb-1"
              : "text-gray-200 hover:text-white transition duration-200"
          }
        >
          Pastes
        </NavLink>
        
      </div>
    </nav>
  );
};

export default Navbar;

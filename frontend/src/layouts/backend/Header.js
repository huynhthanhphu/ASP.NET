import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate to handle redirection

const Header = ({ handleSidebarToggle }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the authentication token from localStorage
    localStorage.removeItem("admin_token");

    // Redirect to the login page after logout
    navigate("/login"); // Make sure you have the route for login
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex items-center">
      {/* Hamburger Button */}
      <button onClick={handleSidebarToggle} className="focus:outline-none mr-4">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Links */}
      <div className="flex items-center space-x-4">
        <Link to="/admin">
          <button className="px-4 py-2 rounded-full transition duration-200 hover:bg-gray-300 hover:text-black flex items-center">
            <img src="https://img.icons8.com/?size=80&id=21081&format=png" alt="Home" className="w-5 h-5 mr-2" />
            Home
          </button>
        </Link>
        <Link to="/contact">
          <button className="px-4 py-2 rounded-full transition duration-200 hover:bg-gray-300 hover:text-black flex items-center">
            <img src="https://img.icons8.com/?size=80&id=37991&format=png" alt="Contact" className="w-5 h-5 mr-2" />
            Contact
          </button>
        </Link>
      </div>

      {/* Logout Button */}
      <div className="flex-1 flex justify-end items-center space-x-4">
        <Link to="/management">
          <button className="px-4 py-2 rounded-full transition duration-200 hover:bg-gray-300 hover:text-black flex items-center">
            <img src="https://img.icons8.com/?size=48&id=13441&format=png" alt="Quản lý" className="w-5 h-5 mr-2" />
            Quản lý
          </button>
        </Link>
        <button 
          onClick={handleLogout}
          className="px-4 py-2 rounded-full transition duration-200 hover:bg-gray-300 hover:text-black flex items-center"
        >
          <img src="https://img.icons8.com/?size=80&id=5HxHtkXB4BPl&format=png" alt="Logout" className="w-5 h-5 mr-2" />
          Thoát
        </button>
      </div>
    </header>
  );
};

export default Header;

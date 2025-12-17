import { Link } from "react-router-dom";
import React, { useState } from "react";
import logo from "../assets/rgb.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo / Studio Name */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="PixalStudio" className="h-8 w-8" />
          <span className="font-bold text-xl">PixalStudio</span>
        </Link>

        {/* Hamburger Button (for mobile) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <ul
          className={`flex-col md:flex-row md:flex space-y-2 md:space-y-0 md:space-x-6 absolute md:static bg-gray-800 w-full left-0 md:w-auto md:justify-end transition-all duration-300 ${
            isOpen ? "top-16 flex" : "top-[-200px] hidden"
          }`}
        >
          <li>
            <Link
              to="/"
              className="block px-4 py-2 hover:text-yellow-400 transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/gallery"
              className="block px-4 py-2 hover:text-yellow-400 transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Gallery
            </Link>
          </li>
          <li>
            <Link
              to="/booking"
              className="block px-4 py-2 hover:text-yellow-400 transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Booking
            </Link>
          </li>
          <li>
            <Link
              to="/admin"
              className="block px-4 py-2 hover:text-yellow-400 transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Admin
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

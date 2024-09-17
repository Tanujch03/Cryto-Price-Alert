import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-gray-800 py-4 shadow-lg">
      <nav className="flex justify-between items-center max-w-7xl mx-auto px-4">
        {/* Branding or Logo */}
        <Link to="/" className="text-white font-bold text-xl hover:text-blue-400">
          CryptoAlert
        </Link>

        {/* Hamburger Menu Icon (for small screens) */}
        <button
          className="block md:hidden text-white hover:text-blue-400 focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Navigation Links - Hidden on small screens, shown on medium+ screens */}
        <div className={`flex-col md:flex-row md:flex ${isOpen ? 'flex' : 'hidden'} md:space-x-8 md:items-center w-full md:w-auto`}>
          <Link to="/alerts" className="text-white hover:text-blue-400 block mt-4 md:mt-0">
            Price Alerts
          </Link>
          <Link to="/features" className="text-white hover:text-blue-400 block mt-4 md:mt-0">
            Features
          </Link>
          <Link to="/pricing" className="text-white hover:text-blue-400 block mt-4 md:mt-0">
            Pricing
          </Link>
          <Link to="/about" className="text-white hover:text-blue-400 block mt-4 md:mt-0">
            About Us
          </Link>
          <Link to="/register" className="text-white hover:text-blue-400 block mt-4 md:mt-0">
            Register
          </Link>
          <Link to="/login" className="text-white hover:text-blue-400 block mt-4 md:mt-0">
            Login
          </Link>
        </div>
      </nav>
    </div>
  );
}

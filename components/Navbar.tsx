import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  return (
    <nav className="bg-gray-800 shadow-md p-4 sticky top-0 z-30">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 lg:hidden mr-4 p-2 rounded-md"
            aria-label="Toggle navigation"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Link to="/" className="text-white text-2xl font-bold">
            PvM Hub
          </Link>
        </div>
        {/* Desktop navigation items could go here if needed, but sidebar handles main nav for this app */}
        <div className="hidden sm:flex space-x-4">
          <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
          <Link to="/guide-editor" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Guide Editor</Link>
          <Link to="/preset-maker" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Preset Maker</Link>
          <Link to="/gear-simulator" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Gear Simulator</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
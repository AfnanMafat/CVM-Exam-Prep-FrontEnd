import React from 'react';
import { Link, Outlet } from 'react-router';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <>
      <nav className="fixed w-full z-50 bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <img 
                src="/CVMLogo.png" 
                alt="CVM Logo" 
                className="h-10 w-10 rounded-lg"
              />
              <span className="text-xl font-bold text-blue-600">CVMExamPrep</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex place-items-start justify-center space-x-40">
              <Link
                to="/HomePage"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md flex items-center gap-2 transition-colors"
              >
                <span className="material-icons-round text-xl">home</span>
                Home
              </Link>
              
              <Link
                to="/UploadMaterial"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md flex items-center gap-2 transition-colors"
              >
                <span className="material-icons-round text-xl">upload</span>
                Upload
              </Link>
              
              <Link
                to="/Feedback"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md flex items-center gap-2 transition-colors"
              >
                <span className="material-icons-round text-xl">feedback</span>
                Feedback
              </Link>
              
              <Link
                to="/"
                className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md flex items-center gap-2 transition-colors"
              >
                <span className="material-icons-round text-xl">logout</span>
                Logout
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-blue-600 focus:outline-none"
              >
                {isMenuOpen ? (
                  <span className="material-icons-round text-2xl">close</span>
                ) : (
                  <span className="material-icons-round text-2xl">menu</span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/HomePage"
                className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md flex items-center gap-2"
              >
                <span className="material-icons-round">home</span>
                Home
              </Link>
              
              <Link
                to="/UploadMaterial"
                className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md flex items-center gap-2"
              >
                <span className="material-icons-round">upload</span>
                Upload
              </Link>
              
              <Link
                to="/Feedback"
                className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md flex items-center gap-2"
              >
                <span className="material-icons-round">feedback</span>
                Feedback
              </Link>
              
              <Link
                to="/"
                className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md flex items-center gap-2"
              >
                <span className="material-icons-round">logout</span>
                Logout
              </Link>
            </div>
          </div>
        )}
      </nav>
      
      <Outlet />
    </>
  );
}
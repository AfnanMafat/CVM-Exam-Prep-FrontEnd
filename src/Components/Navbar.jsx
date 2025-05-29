import React from 'react';
import { Link, Outlet } from 'react-router';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white shadow-xl py-1' : 'bg-gradient-to-r from-indigo-50 to-purple-50 py-2'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-lg shadow-lg">
                <img 
                  src="/CVMLogo.png" 
                  alt="CVM Logo" 
                  className="h-8 w-8 rounded-md"
                />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">CVMExamPrep</span>
                <p className="text-xs text-indigo-500 font-medium">Knowledge Sharing Platform</p>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/HomePage"
                className="relative group text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md flex items-center gap-2 transition-colors"
              >
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></div>
                <span className="material-icons-round text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">home</span>
                <span className="font-medium">Home</span>
              </Link>
              
              <Link
                to="/UploadMaterial"
                className="relative group text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md flex items-center gap-2 transition-colors"
              >
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></div>
                <span className="material-icons-round text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">upload</span>
                <span className="font-medium">Upload</span>
              </Link>
              
              <Link
                to="/Feedback"
                className="relative group text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md flex items-center gap-2 transition-colors"
              >
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></div>
                <span className="material-icons-round text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">feedback</span>
                <span className="font-medium">Feedback</span>
              </Link>
              
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                <Link
                  to="/"
                  className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg"
                >
                  <span className="material-icons-round text-xl">logout</span>
                  <span className="font-medium">Logout</span>
                </Link>
              </div>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-indigo-600 focus:outline-none p-2 rounded-full bg-indigo-50"
              >
                {isMenuOpen ? (
                  <span className="material-icons-round text-2xl text-indigo-600">close</span>
                ) : (
                  <span className="material-icons-round text-2xl text-indigo-600">menu</span>
                )}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-gradient-to-b from-white to-indigo-50 border-t border-indigo-100 shadow-inner">
            <div className="px-2 pt-2 pb-4 space-y-1">
              <Link
                to="/HomePage"
                className="text-gray-700 hover:bg-indigo-50 block px-4 py-3 rounded-lg flex items-center gap-3 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="material-icons-round text-indigo-600">home</span>
                <span className="font-medium">Home</span>
              </Link>
              
              <Link
                to="/UploadMaterial"
                className="text-gray-700 hover:bg-indigo-50 block px-4 py-3 rounded-lg flex items-center gap-3 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="material-icons-round text-indigo-600">upload</span>
                <span className="font-medium">Upload</span>
              </Link>
              
              <Link
                to="/Feedback"
                className="text-gray-700 hover:bg-indigo-50 block px-4 py-3 rounded-lg flex items-center gap-3 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="material-icons-round text-indigo-600">feedback</span>
                <span className="font-medium">Feedback</span>
              </Link>
              
              <Link
                to="/"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white block px-4 py-3 rounded-lg flex items-center gap-3 transition-colors mt-4"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="material-icons-round">logout</span>
                <span className="font-medium">Logout</span>
              </Link>
            </div>
          </div>
        )}
      </nav>
      
      <Outlet />
    </>
  );
}
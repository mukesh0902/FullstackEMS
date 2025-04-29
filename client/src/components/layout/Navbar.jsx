import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import AuthContext from '../../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const onLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const authLinks = (
    <>
      <div className="hidden md:flex items-center">
        {user && user.role === 'admin' ? (
          <Link
            to="/admin/dashboard"
            className="text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Dashboard
          </Link>
        ) : (
          <Link
            to="/employee/dashboard"
            className="text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Dashboard
          </Link>
        )}
        
        <div className="relative ml-3">
          <div className="flex items-center">
            <span className="text-white mr-2">{user && user.name}</span>
            <button
              onClick={onLogout}
              className="text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md text-sm font-medium flex items-center"
            >
              <FaSignOutAlt className="mr-1" /> Logout
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="text-gray-300 hover:text-white focus:outline-none"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
    </>
  );

  const guestLinks = (
    <div>
      <Link
        to="/login"
        className="text-white bg-primary hover:bg-blue-800 px-3 py-2 rounded-md text-sm font-medium"
      >
        Login
      </Link>
    </div>
  );

  return (
    <nav className="bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-white text-xl font-bold">
                EMS
              </Link>
            </div>
          </div>
          
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      {isOpen && isAuthenticated && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800">
            {user && user.role === 'admin' ? (
              <Link
                to="/admin/dashboard"
                className="text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={toggleMenu}
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to="/employee/dashboard"
                className="text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={toggleMenu}
              >
                Dashboard
              </Link>
            )}
            
            <button
              onClick={() => {
                onLogout();
                toggleMenu();
              }}
              className="text-white bg-red-600 hover:bg-red-700 w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center"
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 
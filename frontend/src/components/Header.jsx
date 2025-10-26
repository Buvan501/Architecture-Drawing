import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Header = () => {
  const [dark, setDark] = useState(() => localStorage.getItem('dark') === 'true');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('dark', dark ? 'true' : 'false');
  }, [dark]);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const navigation = [
    { name: 'Home', href: '/', icon: '🏠' },
    { name: '2D Plans', href: '/plans/2d', icon: '📋' },
    { name: '3D Plans', href: '/plans/3d', icon: '🏗️' },
    { name: 'Elevation', href: '/plans/elevation', icon: '🏢' },
    { name: 'Structural', href: '/plans/structural', icon: '📐' },
    { name: 'VR Plans', href: '/plans/vr', icon: '🥽' },
    { name: 'Explore', href: '/explore', icon: '🔍' },
    { name: 'Contact', href: '/contact', icon: '📞' }
  ];

  return (
    <nav className={`border-b ${dark ? 'bg-black border-gray-900' : 'bg-white border-gray-100'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center space-x-3">
                <h1 className={`text-lg font-medium ${dark ? 'text-white' : 'text-black'}`}>
                  Architectural Drawings
                </h1>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:block ml-12">
              <div className="flex items-center space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`text-sm font-normal transition-colors ${
                      dark 
                        ? 'text-gray-400 hover:text-white' 
                        : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            {/* User Authentication */}
            {user ? (
              <div className="flex items-center space-x-4">
                <span className={`text-sm ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Welcome, {user.first_name}
                </span>
                {user.role === 'admin' ? (
                  <Link
                    to="/admin"
                    className={`text-sm font-normal transition-colors ${
                      dark 
                        ? 'text-gray-400 hover:text-white' 
                        : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    Admin Panel
                  </Link>
                ) : (
                  <Link
                    to="/user-dashboard"
                    className={`text-sm font-normal transition-colors ${
                      dark 
                        ? 'text-gray-400 hover:text-white' 
                        : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className={`text-sm font-normal transition-colors ${
                    dark 
                      ? 'text-gray-400 hover:text-white' 
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/user-login"
                  className={`text-sm font-normal transition-colors ${
                    dark 
                      ? 'text-gray-400 hover:text-white' 
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/admin-login"
                  className={`text-sm font-normal transition-colors ${
                    dark 
                      ? 'text-gray-400 hover:text-white' 
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  Admin
                </Link>
              </div>
            )}

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDark(!dark)}
              className={`transition-colors p-2 ${
                dark 
                  ? 'text-gray-400 hover:text-white' 
                  : 'text-gray-600 hover:text-black'
              }`}
              aria-label="Toggle dark mode"
            >
              {dark ? '☀' : '☾'}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 transition-colors ${
                dark 
                  ? 'text-gray-400 hover:text-white' 
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 dark:border-gray-900">
            <div className="py-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-3 text-sm font-normal transition-colors ${
                    dark 
                      ? 'text-gray-400 hover:text-white' 
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
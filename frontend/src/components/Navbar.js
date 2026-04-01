import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Wallet, LogOut, LayoutDashboard, User, BarChart2, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = ({ isPublic = false, theme, onToggleTheme }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [internalTheme, setInternalTheme] = useState(
    () => localStorage.getItem('theme') || 'dark'
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const active = theme || internalTheme;
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(active);
    localStorage.setItem('theme', active);
  }, [theme, internalTheme]);

  const activeTheme = theme || internalTheme;

  const handleThemeToggle = () => {
    if (onToggleTheme) {
      onToggleTheme();
    } else {
      setInternalTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isLight = activeTheme === 'light';

  const navLinkBase = `flex items-center gap-2 text-sm font-medium transition-colors`;
  const navLinkColor = isLight
    ? 'text-gray-600 hover:text-gray-900'
    : 'text-gray-400 hover:text-white';
  const navLinkActive = isLight ? 'text-gray-900 font-semibold' : 'text-white font-semibold';

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ ease: 'easeOut', duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-xl border-b border-[color:var(--border-color)] shadow-xl py-3' : 'py-5'
      }`}
      style={{ backgroundColor: scrolled ? 'var(--nav-bg)' : 'transparent' }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <Link to={isPublic ? '/' : '/dashboard'} className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-premium flex items-center justify-center shadow-[0_4px_15px_rgba(139,92,246,0.3)] group-hover:shadow-[0_4px_25px_rgba(139,92,246,0.5)] transition-all duration-300">
            <Wallet size={20} className="text-white" />
          </div>
          <span
            className="text-xl font-bold tracking-tight"
            style={{ color: 'var(--text-color)' }}
          >
            Velora
          </span>
        </Link>

        {/* Nav links */}
        {isPublic ? (
          <div className="hidden md:flex items-center gap-8">
            {['Features', 'Testimonials', 'Pricing'].map(item => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`text-sm font-medium transition-colors ${navLinkColor}`}
              >
                {item}
              </a>
            ))}
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/dashboard"
              className={`${navLinkBase} ${
                location.pathname === '/dashboard' ? navLinkActive : navLinkColor
              }`}
            >
              <LayoutDashboard size={16} /> Dashboard
            </Link>
            <button
              onClick={() => navigate('/analytics')}
              className={`${navLinkBase} ${
                location.pathname === '/analytics' ? navLinkActive : navLinkColor
              }`}
            >
              <BarChart2 size={16} /> Analytics
            </button>
          </div>
        )}

        {/* Right actions */}
        {isPublic ? (
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className={`text-sm font-medium transition-colors px-4 py-2 ${navLinkColor}`}
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="btn btn-primary px-5 py-2 rounded-xl text-sm shadow-[0_4px_15px_rgba(139,92,246,0.3)] hover:shadow-[0_4px_25px_rgba(139,92,246,0.5)] transition-shadow"
            >
              Get Started
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            {/* Theme toggle */}
            <button
              onClick={handleThemeToggle}
              className="w-9 h-9 rounded-full border border-[color:var(--border-color)] flex items-center justify-center hover:border-[color:var(--accent-color)] transition-all bg-[color:var(--card-color)]"
              style={{ color: 'var(--muted-color)' }}
              title="Toggle theme"
              aria-label="Toggle theme"
            >
              {isLight ? <Moon size={16} /> : <Sun size={16} />}
            </button>

            {/* Avatar */}
            <div
              className="w-9 h-9 rounded-full border border-[color:var(--border-color)] flex items-center justify-center cursor-pointer hover:border-[color:var(--accent-color)] transition-all bg-[color:var(--card-color)]"
              style={{ color: 'var(--muted-color)' }}
            >
              <User size={16} />
            </div>

            <div className="w-px h-6 bg-[color:var(--border-color)]" />

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg hover:text-red-400 hover:bg-red-500/10 transition-colors"
              style={{ color: 'var(--muted-color)' }}
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;

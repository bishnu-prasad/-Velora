import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Wallet, ArrowRight, Loader2, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Read theme so we can apply theme-aware styles
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
  }, [theme]);

  const isLight = theme === 'light';

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    setError('');

    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);

    try {
      const response = await api.post('/login', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      const token = response.data.access_token || response.data.token;
      if (token) {
        localStorage.setItem('token', token);
        navigate('/dashboard');
      } else {
        setError('Auth failed: No token received.');
      }
    } catch (err) {
      let errorMessage = 'Invalid credentials. Please try again.';
      if (err.response?.data?.detail) {
        errorMessage = Array.isArray(err.response.data.detail)
          ? err.response.data.detail[0].msg
          : err.response.data.detail;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden transition-colors duration-300"
      style={{ backgroundColor: 'var(--bg-color)' }}
    >
      {/* Theme toggle */}
      <button
        onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
        className="absolute top-6 right-6 w-9 h-9 rounded-full flex items-center justify-center border transition-all z-20"
        style={{
          backgroundColor: 'var(--card-color)',
          borderColor: 'var(--border-color)',
          color: 'var(--muted-color)',
        }}
        aria-label="Toggle theme"
      >
        {isLight ? '🌙' : '☀️'}
      </button>

      {/* Background glow (dark only) */}
      {!isLight && (
        <>
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
        </>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-[440px] relative z-20"
        style={{
          backgroundColor: 'var(--card-color)',
          border: '1px solid var(--border-color)',
          borderRadius: '1.25rem',
          boxShadow: isLight
            ? '0 8px 32px rgba(0,0,0,0.08)'
            : '0 20px 60px rgba(0,0,0,0.5)',
        }}
      >
        {/* Top accent bar */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-premium opacity-80 rounded-tl-[1.25rem] rounded-tr-[1.25rem]" />

        <div className="p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-premium mb-6 shadow-[0_0_30px_rgba(139,92,246,0.4)]">
              <Wallet size={32} className="text-white" />
            </div>
            <h1
              className="text-3xl font-bold mb-2 tracking-tight"
              style={{ color: 'var(--text-color)' }}
            >
              Welcome Back
            </h1>
            <p style={{ color: 'var(--muted-color)' }}>
              Sign in to your{' '}
              <span className="font-semibold" style={{ color: 'var(--accent-color)' }}>
                Velora
              </span>{' '}
              account
            </p>
          </div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mb-6 overflow-hidden"
              >
                <div className="bg-red-500/10 border border-red-500/30 text-red-500 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                  {error}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-5">

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                id="email"
                className="peer input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                autoComplete="username"
                required
              />
              <label htmlFor="email" className="floating-label">
                Email Address
              </label>
            </div>

            {/* Password */}
            <div className="relative mb-4">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="peer input-field pr-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
              <label htmlFor="password" className="floating-label">
                Password
              </label>
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 transition-colors z-10"
                style={{ color: 'var(--muted-color)' }}
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full py-3.5 text-base"
              disabled={loading}
            >
              {loading ? (
                <Loader2 size={20} className="animate-spin text-white" />
              ) : (
                <>Sign In <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm" style={{ color: 'var(--muted-color)' }}>
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="font-semibold transition-colors hover:underline"
              style={{ color: 'var(--accent-color)' }}
            >
              Create account
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

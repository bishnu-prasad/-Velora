import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, PieChart as PieChartIcon, X, Wallet, Loader2, Sparkles, BarChart2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import ExpenseItem from '../components/ExpenseItem';
import SkeletonDashboard from '../components/SkeletonDashboard';

// Theme-aware chart palettes
const DARK_COLORS  = ['#8b5cf6', '#10b981', '#f59e0b', '#ec4899', '#3b82f6', '#14b8a6', '#f97316'];
const LIGHT_COLORS = ['#7c3aed', '#059669', '#d97706', '#db2777', '#2563eb', '#0d9488', '#ea580c'];

const formatCurrency = (num = 0) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(num) || 0);

const Dashboard = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [analytics, setAnalytics] = useState({ total_spent: 0, category_breakdown: {} });
  const [expenses, setExpenses]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [toast, setToast]         = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle]         = useState('');
  const [amount, setAmount]       = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isLight = theme === 'light';

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const [analyticsRes, expensesRes] = await Promise.all([
        api.get('/analytics'),
        api.get('/expenses'),
      ]);
      setAnalytics(analyticsRes.data);
      setExpenses(expensesRes.data);
    } catch {
      showToast('Connection failed. Please refresh.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(storedTheme);
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(storedTheme);
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/expenses/${id}`);
      setExpenses(prev => prev.filter(e => e.id !== id));
      const analyticsRes = await api.get('/analytics');
      setAnalytics(analyticsRes.data);
      showToast('Transaction deleted', 'success');
    } catch {
      showToast('Failed to delete expense', 'error');
    }
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (!title || !amount) return;
    setIsSubmitting(true);
    try {
      const res = await api.post('/expenses', { title, amount: parseFloat(amount) });
      setTitle('');
      setAmount('');
      setIsModalOpen(false);
      showToast('Velora AI categorized your expense!', 'success');

      const payload = res.data;
      if (Array.isArray(payload)) {
        setExpenses(payload.map(item => ({
          ...item,
          amount: Number(item.amount) || 0,
          category: item.category || 'uncategorized',
        })));
      } else {
        const normalized = {
          ...payload,
          amount: Number(payload.amount) || 0,
          category: payload.category || 'uncategorized',
        };
        setExpenses(prev => {
          if (prev.some(exp => exp.id === normalized.id)) return prev;
          return [normalized, ...prev];
        });
      }

      const analyticsRes = await api.get('/analytics');
      setAnalytics(analyticsRes.data);
    } catch {
      showToast('Failed to capture expense', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const palette  = isLight ? LIGHT_COLORS : DARK_COLORS;
  const axisColor = isLight ? '#94a3b8' : '#6B7280';

  const pieData = Object.entries(analytics.category_breakdown || {})
    .map(([key, value]) => ({ name: key, value: Number(value) || 0 }))
    .filter(item => item.value > 0)
    .sort((a, b) => b.value - a.value);

  const topCategory = pieData.length > 0 ? pieData[0] : null;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-chart-tooltip">
          <div className="label">{payload[0].name || label}</div>
          <div className="value">{formatCurrency(payload[0].value)}</div>
        </div>
      );
    }
    return null;
  };

  if (loading && expenses.length === 0) return <SkeletonDashboard />;

  return (
    <div
      className="min-h-screen flex flex-col pt-20 transition-colors duration-300"
      style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
    >
      <Navbar
        theme={theme}
        onToggleTheme={() => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))}
      />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 z-10 relative">

        {/* Page header */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1
              className="text-4xl font-bold tracking-tight mb-2"
              style={{ color: 'var(--text-color)' }}
            >
              Overview
            </h1>
            <p style={{ color: 'var(--muted-color)' }}>
              Track and optimize your spending with AI intelligence.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary flex shadow-[0_4px_20px_rgba(139,92,246,0.3)]"
          >
            <Sparkles size={18} /> Log Purchase
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card title="Total Spent" icon={DollarSign} value={formatCurrency(analytics.total_spent)} />
          <Card
            title="Top Category"
            icon={TrendingUp}
            value={topCategory ? <span className="capitalize">{topCategory.name}</span> : 'N/A'}
          />
          <Card title="Transactions" icon={PieChartIcon} value={expenses.length} />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {/* Bar chart */}
          <div className="lg:col-span-2">
            <Card title="Spending Breakdown">
              {pieData.length > 0 ? (
                <div className="h-[380px] w-full mt-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={pieData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                      <XAxis
                        dataKey="name"
                        stroke={axisColor}
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        className="capitalize"
                      />
                      <YAxis
                        stroke={axisColor}
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={v => formatCurrency(v)}
                      />
                      <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(139,92,246,0.05)', radius: 8 }} />
                      <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={48}>
                        {pieData.map((_, i) => (
                          <Cell key={`cell-${i}`} fill={`url(#colorGradient${i})`} />
                        ))}
                      </Bar>
                      <defs>
                        {pieData.map((_, i) => (
                          <linearGradient key={`gradient-${i}`} id={`colorGradient${i}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%"  stopColor={palette[i % palette.length]} stopOpacity={1} />
                            <stop offset="95%" stopColor={palette[i % palette.length]} stopOpacity={0.5} />
                          </linearGradient>
                        ))}
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div
                  className="h-[380px] flex flex-col items-center justify-center gap-4 mt-6"
                  style={{ color: 'var(--muted-color)' }}
                >
                  <BarChart2 size={48} className="opacity-30" />
                  No analytics available yet
                </div>
              )}
            </Card>
          </div>

          {/* Pie chart */}
          <div className="lg:col-span-1">
            <Card title="Distribution">
              {pieData.length > 0 ? (
                <div className="h-[380px] w-full mt-6 relative flex flex-col">
                  <ResponsiveContainer width="100%" height="80%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={110}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                        cornerRadius={8}
                      >
                        {pieData.map((_, i) => (
                          <Cell
                            key={`cell-${i}`}
                            fill={palette[i % palette.length]}
                            style={{ filter: `drop-shadow(0 0 8px ${palette[i % palette.length]}60)` }}
                          />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>

                  {/* Legend */}
                  <div className="flex flex-wrap justify-center gap-4 mt-4 overflow-y-auto pb-4">
                    {pieData.map((entry, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: palette[index % palette.length] }}
                        />
                        <span
                          className="text-sm capitalize"
                          style={{ color: 'var(--muted-color)' }}
                        >
                          {entry.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div
                  className="h-[380px] flex items-center justify-center mt-6"
                  style={{ color: 'var(--muted-color)' }}
                >
                  No data yet
                </div>
              )}
            </Card>
          </div>
        </div>

        {/* Transactions */}
        {expenses.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2
                className="text-2xl font-bold tracking-tight"
                style={{ color: 'var(--text-color)' }}
              >
                Recent Activity
              </h2>
              <span
                className="text-sm font-medium cursor-pointer hover:underline transition-colors"
                style={{ color: 'var(--accent-color)' }}
              >
                View All
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <AnimatePresence initial={false}>
                {expenses.map((expense, index) => (
                  <ExpenseItem
                    key={expense.id}
                    expense={expense}
                    onDelete={handleDelete}
                    index={index}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </main>

      <Footer />

      {/* FAB */}
      <div className="fixed bottom-6 right-6 z-[120] group">
        <div
          className="absolute right-full mr-3 px-3 py-1 rounded-lg text-xs font-semibold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
          style={{
            backgroundColor: 'var(--card-color)',
            border: '1px solid var(--border-color)',
            color: 'var(--muted-color)',
          }}
        >
          Add Expense
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          aria-label="Add expense"
          className="text-white px-5 py-3 rounded-full shadow-[0_10px_40px_rgba(139,92,246,0.35)] hover:shadow-[0_12px_50px_rgba(139,92,246,0.5)] transition-all duration-200 flex items-center gap-2 hover:scale-105 active:scale-95 focus:outline-none"
          style={{ background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)' }}
        >
          <Sparkles size={18} /> Add
        </button>
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              className="w-full max-w-lg rounded-3xl overflow-hidden relative shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
              style={{
                backgroundColor: 'var(--card-color)',
                border: '1px solid var(--border-color)',
              }}
              onClick={e => e.stopPropagation()}
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-premium" />

              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 border border-purple-500/30">
                      <Sparkles size={20} />
                    </div>
                    <div>
                      <h3
                        className="text-xl font-bold"
                        style={{ color: 'var(--text-color)' }}
                      >
                        Smart Track
                      </h3>
                      <p className="text-xs font-medium tracking-wide uppercase" style={{ color: 'var(--accent-color)' }}>
                        AI Categorization
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 rounded-lg transition-colors"
                    style={{ color: 'var(--muted-color)' }}
                    aria-label="Close modal"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleAddExpense} className="flex flex-col gap-5">
                  <div className="relative">
                    <input
                      type="text"
                      id="modal-title"
                      className="peer input-field"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      placeholder="Uber to airport"
                      required
                    />
                    <label htmlFor="modal-title" className="floating-label">
                      Transaction Description
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="number"
                      id="modal-amount"
                      className="peer input-field font-mono"
                      value={amount}
                      onChange={e => setAmount(e.target.value)}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      required
                    />
                    <label htmlFor="modal-amount" className="floating-label">
                      Amount ($)
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-full py-4 mt-4 text-base tracking-wide flex justify-center shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? <Loader2 size={24} className="animate-spin text-white" />
                      : 'Log Intelligence'
                    }
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="fixed bottom-6 right-6 z-[200] flex items-center gap-3 rounded-xl p-4 shadow-2xl min-w-[300px]"
            style={{
              backgroundColor: 'var(--card-color)',
              border: '1px solid var(--border-color)',
            }}
          >
            <div
              className={`w-2 h-full absolute left-0 top-0 bottom-0 rounded-l-xl ${
                toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'
              }`}
            />
            {toast.type === 'error'
              ? <div className="text-red-500 bg-red-500/10 p-2 rounded-lg ml-2"><X size={18} /></div>
              : <div className="text-green-500 bg-green-500/10 p-2 rounded-lg ml-2"><Wallet size={18} /></div>
            }
            <span className="font-medium text-sm" style={{ color: 'var(--text-color)' }}>
              {toast.message}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;

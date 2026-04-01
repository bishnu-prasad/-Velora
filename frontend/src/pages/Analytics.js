import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid, Legend,
} from 'recharts';
import { BarChart2, TrendingUp, Layers, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';

const COLORS = ['#8b5cf6', '#10b981', '#f59e0b', '#ec4899', '#3b82f6', '#14b8a6', '#f97316'];
const LIGHT_COLORS = ['#7c3aed', '#059669', '#d97706', '#db2777', '#2563eb', '#0d9488', '#ea580c'];

const formatCurrency = (num = 0) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(num) || 0);

const Analytics = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [analytics, setAnalytics] = useState({ total_spent: 0, category_breakdown: {} });
  const [loading, setLoading] = useState(true);

  const isLight = theme === 'light';
  const palette = isLight ? LIGHT_COLORS : COLORS;
  const axisColor = isLight ? '#94a3b8' : '#6B7280';

  useEffect(() => {
    const stored = localStorage.getItem('theme') || 'dark';
    setTheme(stored);
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(stored);

    api.get('/analytics')
      .then(res => setAnalytics(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const categoryData = Object.entries(analytics.category_breakdown || {})
    .map(([name, value]) => ({ name, value: Number(value) || 0 }))
    .filter(d => d.value > 0)
    .sort((a, b) => b.value - a.value);

  const topCategory = categoryData[0] || null;
  const avgSpend = categoryData.length
    ? analytics.total_spent / categoryData.length
    : 0;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
      return (
        <div className="custom-chart-tooltip">
          <div className="label">{payload[0].name || label}</div>
          <div className="value">{formatCurrency(payload[0].value)}</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className="min-h-screen flex flex-col pt-20 transition-colors duration-300"
      style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
    >
      <Navbar
        theme={theme}
        onToggleTheme={() => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))}
      />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-premium flex items-center justify-center">
              <BarChart2 size={20} className="text-white" />
            </div>
            <h1
              className="text-4xl font-bold tracking-tight"
              style={{ color: 'var(--text-color)' }}
            >
              Analytics
            </h1>
          </div>
          <p style={{ color: 'var(--muted-color)' }}>
            Deep insights into your spending patterns, powered by Velora AI.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center h-64" style={{ color: 'var(--muted-color)' }}>
            <div className="animate-spin w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full" />
          </div>
        ) : (
          <>
            {/* Summary cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <Card title="Total Spending" icon={TrendingUp} value={formatCurrency(analytics.total_spent)} />
              <Card
                title="Top Category"
                icon={Layers}
                value={
                  topCategory
                    ? <span className="capitalize">{topCategory.name}</span>
                    : 'N/A'
                }
              />
              <Card title="Avg per Category" icon={ArrowUpRight} value={formatCurrency(avgSpend)} />
            </div>

            {/* Category Bar Chart */}
            <div className="mb-8">
              <Card title="Category Breakdown">
                {categoryData.length > 0 ? (
                  <div className="h-[380px] mt-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={categoryData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={`${axisColor}30`} vertical={false} />
                        <XAxis dataKey="name" stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} tickFormatter={v => formatCurrency(v)} />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(139,92,246,0.07)' }} />
                        <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={44}>
                          {categoryData.map((_, i) => (
                            <rect key={i} fill={palette[i % palette.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-[380px] flex flex-col items-center justify-center gap-3 mt-6" style={{ color: 'var(--muted-color)' }}>
                    <BarChart2 size={48} className="opacity-20" />
                    <p>No data to display yet.</p>
                    <p className="text-sm">Add some expenses on the Dashboard.</p>
                  </div>
                )}
              </Card>
            </div>

            {/* Spending trend (simulated) */}
            {categoryData.length > 0 && (
              <Card title="Spending Trend (by Category Rank)">
                <div className="h-[300px] mt-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={categoryData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={`${axisColor}30`} />
                      <XAxis dataKey="name" stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} tickFormatter={v => formatCurrency(v)} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={palette[0]}
                        strokeWidth={2.5}
                        dot={{ fill: palette[0], r: 5 }}
                        activeDot={{ r: 7 }}
                        name="Spending"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Analytics;

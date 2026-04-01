import React from 'react';
import { Trash2, Coffee, ShoppingBag, Car, Home, Zap, Heart, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';

const getCategoryStyle = (category) => {
  const cat = category?.toLowerCase() || '';
  if (cat.includes('food') || cat.includes('coffee') || cat.includes('dining'))
    return { icon: <Coffee size={20} />, color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' };
  if (cat.includes('shopping') || cat.includes('clothing'))
    return { icon: <ShoppingBag size={20} />, color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20' };
  if (cat.includes('transport') || cat.includes('gas') || cat.includes('transit'))
    return { icon: <Car size={20} />, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' };
  if (cat.includes('home') || cat.includes('rent'))
    return { icon: <Home size={20} />, color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' };
  if (cat.includes('utility') || cat.includes('electricity'))
    return { icon: <Zap size={20} />, color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' };
  if (cat.includes('health') || cat.includes('medical'))
    return { icon: <Heart size={20} />, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' };
  return { icon: <Monitor size={20} />, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' };
};

const ExpenseItem = ({ expense, onDelete, index }) => {
  const style = getCategoryStyle(expense.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group relative flex items-center justify-between p-5 rounded-2xl transition-all duration-300 hover:shadow-lg"
      style={{
        backgroundColor: 'var(--card-color)',
        border: '1px solid var(--border-color)',
      }}
    >
      <div className="flex items-center gap-5">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${style.bg} ${style.border} border ${style.color} shadow-inner flex-shrink-0`}
        >
          {style.icon}
        </div>

        <div className="flex flex-col gap-1">
          <span
            className="font-semibold text-lg tracking-tight transition-colors group-hover:text-purple-500"
            style={{ color: 'var(--text-color)' }}
          >
            {expense.title}
          </span>
          <div className="flex items-center gap-3">
            <span
              className={`text-[11px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full ${style.bg} ${style.color} border ${style.border}`}
            >
              {expense.category || 'Uncategorized'}
            </span>
            <span
              className="text-sm"
              style={{ color: 'var(--muted-color)' }}
            >
              Just added
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div
          className="text-xl font-bold font-mono"
          style={{ color: 'var(--text-color)' }}
        >
          ${expense.amount.toFixed(2)}
        </div>

        <div className="w-px h-10 hidden sm:block" style={{ backgroundColor: 'var(--border-color)' }} />

        <button
          onClick={() => onDelete(expense.id)}
          className="p-2.5 rounded-xl hover:text-red-400 hover:bg-red-500/10 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)] transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
          style={{ color: 'var(--muted-color)' }}
          title="Delete Expense"
          aria-label="Delete Expense"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </motion.div>
  );
};

export default ExpenseItem;

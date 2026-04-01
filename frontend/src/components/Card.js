import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ title, icon: Icon, value, className = '', children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`relative overflow-hidden rounded-2xl p-6 group transition-all duration-300 hover:shadow-xl ${className}`}
      style={{
        backgroundColor: 'var(--card-color)',
        border: '1px solid var(--border-color)',
      }}
    >
      {/* Subtle top glow on hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {(title || Icon) && (
        <div className="flex justify-between items-center mb-4">
          {title && (
            <h3
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: 'var(--muted-color)' }}
            >
              {title}
            </h3>
          )}
          {Icon && (
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 group-hover:bg-purple-500/10"
              style={{
                backgroundColor: 'rgba(139,92,246,0.08)',
                border: '1px solid var(--border-color)',
                color: 'var(--primary-color)',
              }}
            >
              <Icon size={20} />
            </div>
          )}
        </div>
      )}

      {value !== undefined && (
        <div
          className="text-3xl md:text-4xl font-bold tracking-tight drop-shadow-sm"
          style={{ color: 'var(--text-color)' }}
        >
          {value}
        </div>
      )}

      {children && <div className={value !== undefined ? 'mt-4' : ''}>{children}</div>}
    </motion.div>
  );
};

export default Card;

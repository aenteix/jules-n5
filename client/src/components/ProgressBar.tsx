import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  max: number;
  label?: string;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, max, label, className }) => {
  const percentage = Math.min(100, Math.max(0, (current / max) * 100));

  return (
    <div className={`w-full ${className || ''}`}>
      {label && (
        <div className="flex justify-between text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">
          <span>{label}</span>
          <span>{current} / {max} XP</span>
        </div>
      )}
      <div className="h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner border border-gray-100">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 shadow-md"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

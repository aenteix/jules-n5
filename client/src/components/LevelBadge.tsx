import React from 'react';
import { motion } from 'framer-motion';

interface LevelBadgeProps {
  level: number;
}

export const LevelBadge: React.FC<LevelBadgeProps> = ({ level }) => {
  return (
    <div className="relative inline-flex items-center justify-center">
      <motion.div
        key={level}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg border-2 border-yellow-200 z-10"
      >
        <span className="text-xl font-bold text-yellow-900 font-serif">{level}</span>
      </motion.div>
      <div className="absolute -bottom-2 bg-yellow-600 text-yellow-50 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide shadow-sm border border-yellow-400 z-20">
        Level
      </div>
    </div>
  );
};

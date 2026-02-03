import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { cn } from '../lib/utils';

interface FlashcardProps {
  cardId: string;
  kanji?: string | null;
  hiragana: string;
  meaning: string;
  onReview?: (status: 'known' | 'forgot') => void;
}

export const Flashcard: React.FC<FlashcardProps> = ({
  cardId,
  kanji,
  hiragana,
  meaning,
  onReview,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFlip = () => {
    if (!isLoading) {
      setIsFlipped(!isFlipped);
    }
  };

  const handleReview = async (e: React.MouseEvent, status: 'known' | 'forgot') => {
    e.stopPropagation(); // Prevent flipping when clicking buttons
    setIsLoading(true);
    try {
      // In a real app, this would be your actual API endpoint
      await axios.post('/api/reviews', { cardId, status });
      if (onReview) {
        onReview(status);
      }
      // Optional: Reset flip state after review
      setIsFlipped(false);
    } catch (error) {
      console.error('Failed to update progress', error);
      // For demo purposes, we'll assume success even if API fails (since no backend is running)
      if (onReview) {
        onReview(status);
      }
      setIsFlipped(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-64 h-80 [perspective:1000px] cursor-pointer group" onClick={handleFlip}>
      <motion.div
        className="w-full h-full relative [transform-style:preserve-3d]"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front Face */}
        <div
          className={cn(
            "absolute inset-0 w-full h-full bg-white rounded-xl shadow-xl border-2 border-gray-100",
            "flex flex-col items-center justify-center p-6 [backface-visibility:hidden]",
            "hover:shadow-2xl transition-shadow duration-300"
          )}
        >
          <div className="text-center">
            <h2 className="text-6xl font-bold text-gray-800 mb-4 font-serif">
              {kanji || hiragana}
            </h2>
            <p className="text-gray-400 text-sm font-medium uppercase tracking-widest">
              Tap to Flip
            </p>
          </div>
        </div>

        {/* Back Face */}
        <div
          className={cn(
            "absolute inset-0 w-full h-full bg-slate-50 rounded-xl shadow-xl border-2 border-blue-100",
            "flex flex-col items-center justify-between p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]"
          )}
        >
          <div className="flex-1 flex flex-col items-center justify-center space-y-3 w-full">
            {kanji && <div className="text-xl text-gray-400 font-serif">{kanji}</div>}
            <div className="text-4xl font-bold text-blue-600">{hiragana}</div>
            <div className="w-12 h-1 bg-blue-100 rounded-full my-2"></div>
            <div className="text-xl text-gray-700 text-center font-medium">{meaning}</div>
          </div>

          <div className="flex gap-3 w-full mt-4">
            <button
              onClick={(e) => handleReview(e, 'forgot')}
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 font-bold transition-all active:scale-95 disabled:opacity-50 shadow-sm"
            >
              Lupa
            </button>
            <button
              onClick={(e) => handleReview(e, 'known')}
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 font-bold transition-all active:scale-95 disabled:opacity-50 shadow-sm"
            >
              Tahu
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

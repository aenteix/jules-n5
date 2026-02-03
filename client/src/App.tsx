import { useState, useEffect } from 'react';
import { Flashcard } from './components/Flashcard';
import { ProgressBar } from './components/ProgressBar';
import { LevelBadge } from './components/LevelBadge';
import { getLevelFromXP, calculateProgressToNextLevel, XP_PER_SESSION, CARDS_PER_SESSION } from './lib/gamification';

function App() {
  const [reviewCount, setReviewCount] = useState(0);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);

  // Derived state
  const level = getLevelFromXP(xp);
  const progress = calculateProgressToNextLevel(xp);

  // Check for session completion
  useEffect(() => {
    if (reviewCount > 0 && reviewCount % CARDS_PER_SESSION === 0) {
      // Award XP
      setXp(currentXp => currentXp + XP_PER_SESSION);
      // Increment streak (simplified logic for demo)
      setStreak(s => s + 1);
    }
  }, [reviewCount]);

  const handleReview = (status: 'known' | 'forgot') => {
    console.log(`User reviewed card as: ${status}`);
    setReviewCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      {/* Header with Stats */}
      <header className="w-full max-w-4xl flex items-center justify-between mb-12 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-4">
           <LevelBadge level={level} />
           <div className="flex flex-col">
             <h2 className="font-bold text-gray-800 text-lg">Player One</h2>
             <div className="text-xs text-gray-400 font-medium">Streak: {streak} 🔥</div>
           </div>
        </div>

        <div className="w-64">
           <ProgressBar current={progress.current} max={progress.max} label="XP Progress" />
        </div>
      </header>

      <h1 className="text-3xl font-bold mb-8 text-gray-800">Flashcard Review Demo</h1>

      <div className="flex flex-wrap justify-center gap-8">
        <Flashcard
          cardId="demo-card-1"
          kanji="猫"
          hiragana="ねこ"
          meaning="Cat"
          onReview={handleReview}
        />

        <Flashcard
          cardId="demo-card-2"
          kanji="犬"
          hiragana="いぬ"
          meaning="Dog"
          onReview={handleReview}
        />
      </div>

      <div className="mt-12 text-center text-gray-600">
        <p>Reviews completed: {reviewCount}</p>
        <p className="text-sm mt-1 font-semibold text-blue-600">
          Review {CARDS_PER_SESSION - (reviewCount % CARDS_PER_SESSION)} more cards to complete session!
        </p>
        <p className="text-sm mt-2 text-gray-400">Check console for API mock logs</p>
      </div>
    </div>
  );
}

export default App;

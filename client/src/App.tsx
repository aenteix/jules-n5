import { useState } from 'react';
import { Flashcard } from './components/Flashcard';

function App() {
  const [reviewCount, setReviewCount] = useState(0);

  const handleReview = (status: 'known' | 'forgot') => {
    console.log(`User reviewed card as: ${status}`);
    setReviewCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
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
        <p>Reviews completed in this session: {reviewCount}</p>
        <p className="text-sm mt-2 text-gray-400">Check console for API mock logs</p>
      </div>
    </div>
  );
}

export default App;

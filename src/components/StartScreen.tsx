interface StartScreenProps {
  onStartClassic: () => void;
  onStartDeck: () => void;
}

export function StartScreen({ onStartClassic, onStartDeck }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6 bg-gray-50">
      <div className="text-center max-w-sm">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Bingo Mixer</h1>
        <p className="text-lg text-gray-600 mb-8">Find your people!</p>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-8">
          <h2 className="font-semibold text-gray-800 mb-3">How to play</h2>
          <ul className="text-left text-gray-600 text-sm space-y-2">
            <li>• Find people who match the questions</li>
            <li>• Tap a square when you find a match</li>
            <li>• Get 5 in a row to win!</li>
          </ul>
        </div>

        <div className="space-y-3">
          <button
            onClick={onStartClassic}
            className="w-full bg-accent text-white font-semibold py-4 px-8 rounded-lg text-lg active:bg-accent-light transition-colors"
          >
            Start Classic Bingo
          </button>
          <button
            onClick={onStartDeck}
            className="w-full bg-gray-900 text-white font-semibold py-4 px-8 rounded-lg text-lg active:bg-gray-700 transition-colors"
          >
            Start Card Deck Shuffle
          </button>
        </div>
      </div>
    </div>
  );
}

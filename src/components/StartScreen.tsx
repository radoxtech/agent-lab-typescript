import type { QuestionTheme } from '../data/themes';

interface StartScreenProps {
  themes: QuestionTheme[];
  selectedTheme: QuestionTheme;
  onSelectTheme: (theme: QuestionTheme) => void;
  onStartClassic: () => void;
  onStartDeck: () => void;
}

export function StartScreen({ themes, selectedTheme, onSelectTheme, onStartClassic, onStartDeck }: StartScreenProps) {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-full p-6"
      style={{ background: 'linear-gradient(160deg, #0f0a1e 0%, #1a0d38 60%, #0d1a2e 100%)' }}
    >
      {/* Title */}
      <div className="text-center mb-8 animate-slide-up">
        <div className="text-5xl mb-2">🎱</div>
        <h1
          className="text-5xl font-black tracking-tight mb-1"
          style={{ background: 'linear-gradient(90deg, #e91e8c, #ffd600)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
        >
          Bingo Mixer
        </h1>
        <p className="text-text-muted text-base mt-1">Find your people!</p>
      </div>

      {/* Theme picker */}
      <div className="w-full max-w-sm mb-6 animate-slide-up" style={{ animationDelay: '0.08s' }}>
        <p className="text-text-muted text-xs uppercase tracking-widest mb-2 text-center">Choose a theme</p>
        <div className="flex gap-2 overflow-x-auto pb-1 justify-center flex-wrap">
          {themes.map((theme) => {
            const isSelected = theme.id === selectedTheme.id;
            return (
              <button
                key={theme.id}
                onClick={() => onSelectTheme(theme)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 active:scale-95"
                style={
                  isSelected
                    ? { background: 'linear-gradient(90deg, #e91e8c, #9c27b0)', color: '#fff', boxShadow: '0 0 12px rgba(233,30,140,0.5)' }
                    : { background: '#2a1a4a', color: '#b09fc8', border: '1px solid #3d2870' }
                }
              >
                <span>{theme.emoji}</span>
                <span>{theme.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* How to play */}
      <div
        className="w-full max-w-sm mb-6 rounded-xl p-4 animate-slide-up"
        style={{ background: '#1e1333', border: '1px solid #3d2870', animationDelay: '0.14s' }}
      >
        <h2 className="font-bold text-text text-sm mb-2">How to play</h2>
        <ul className="text-text-muted text-sm space-y-1">
          <li>• Find people who match the questions</li>
          <li>• Tap a square when you find a match</li>
          <li>• Get 5 in a row — or four corners — to win!</li>
        </ul>
      </div>

      {/* Buttons */}
      <div className="w-full max-w-sm space-y-3 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <button
          onClick={onStartClassic}
          className="w-full font-bold py-4 px-8 rounded-xl text-lg text-white active:scale-95 transition-transform duration-150"
          style={{ background: 'linear-gradient(135deg, #e91e8c, #9c27b0)', boxShadow: '0 4px 20px rgba(233,30,140,0.4)' }}
        >
          🎯 Classic Bingo
        </button>
        <button
          onClick={onStartDeck}
          className="w-full font-bold py-4 px-8 rounded-xl text-lg text-white active:scale-95 transition-transform duration-150"
          style={{ background: 'linear-gradient(135deg, #00c9b1, #0077b6)', boxShadow: '0 4px 20px rgba(0,201,177,0.4)' }}
        >
          🃏 Card Deck Shuffle
        </button>
      </div>
    </div>
  );
}

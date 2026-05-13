import type { QuestionTheme } from '../data/themes';

interface CardDeckScreenProps {
  currentCard: string;
  successCount: number;
  failCount: number;
  drawCount: number;
  theme: QuestionTheme;
  onFail: () => void;
  onSuccess: () => void;
  onBack: () => void;
}

export function CardDeckScreen({
  currentCard,
  successCount,
  failCount,
  drawCount,
  theme,
  onFail,
  onSuccess,
  onBack,
}: CardDeckScreenProps) {
  return (
    <div className="flex flex-col min-h-full" style={{ background: '#0f0a1e' }}>
      <header
        className="flex items-center justify-between px-3 py-2.5"
        style={{ background: '#1e1333', borderBottom: '1px solid #3d2870' }}
      >
        <button
          onClick={onBack}
          className="text-text-muted text-sm px-3 py-1.5 rounded-lg active:bg-surface-elevated transition-colors"
        >
          ← Back
        </button>
        <h1 className="font-bold text-text text-base">{theme.emoji} Card Deck</h1>
        <div className="w-16" />
      </header>

      <p className="text-center text-text-muted text-xs py-2 px-4">
        Draw #{drawCount} — mark fail or success, then draw the next card.
      </p>

      {/* Card */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div
          className="w-full max-w-md rounded-2xl p-8 text-center animate-slide-up"
          style={{
            background: 'linear-gradient(160deg, #1e1333, #2a1a4a)',
            border: '1.5px solid #3d2870',
            boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
          }}
        >
          <p
            className="text-xs uppercase tracking-widest mb-4 font-semibold"
            style={{ color: '#9e86cc' }}
          >
            Question card
          </p>
          <p className="text-2xl font-bold leading-snug" style={{ color: '#f5eeff' }}>
            {currentCard}
          </p>
        </div>
      </div>

      <div className="px-4 pb-6">
        <div className="grid grid-cols-2 gap-3 mb-3">
          <button
            onClick={onFail}
            aria-label="Mark as fail"
            className="font-bold py-4 rounded-xl text-white active:scale-95 transition-transform duration-150"
            style={{ background: 'linear-gradient(135deg, #b71c1c, #f44336)', boxShadow: '0 4px 16px rgba(244,67,54,0.4)' }}
          >
            ✗ Fail
          </button>
          <button
            onClick={onSuccess}
            aria-label="Mark as success"
            className="font-bold py-4 rounded-xl text-white active:scale-95 transition-transform duration-150"
            style={{ background: 'linear-gradient(135deg, #00695c, #00c853)', boxShadow: '0 4px 16px rgba(0,200,83,0.4)' }}
          >
            ✓ Success
          </button>
        </div>

        <div
          className="rounded-xl py-3 text-center text-sm font-semibold"
          style={{ background: '#1e1333', border: '1px solid #3d2870' }}
        >
          <span style={{ color: '#00c9b1' }}>✓ {successCount}</span>
          <span style={{ color: '#3d2870', margin: '0 12px' }}>|</span>
          <span style={{ color: '#f44336' }}>✗ {failCount}</span>
        </div>
      </div>
    </div>
  );
}

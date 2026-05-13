import { useState } from 'react';

interface BingoModalProps {
  onDismiss: () => void;
}

const SHARE_MESSAGE = '🎉 BINGO! I got a line in Bingo Mixer! Try it out!';

export function BingoModal({ onDismiss }: BingoModalProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: 'Bingo Mixer', text: SHARE_MESSAGE });
      } catch {
        // user cancelled — that's fine
      }
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(SHARE_MESSAGE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50 animate-fade-in" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}>
      <div
        className="rounded-2xl p-6 max-w-xs w-full text-center animate-bingo-pop"
        style={{ background: 'linear-gradient(160deg, #1e1333, #2a1a4a)', border: '1.5px solid #e91e8c', boxShadow: '0 0 40px rgba(233,30,140,0.35)' }}
      >
        {/* Confetti dots */}
        <div className="relative h-8 mb-2 overflow-hidden" aria-hidden="true">
          {['#e91e8c', '#ffd600', '#00c9b1', '#9c27b0', '#e91e8c', '#ffd600'].map((color, i) => (
            <span
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: color,
                left: `${10 + i * 15}%`,
                top: 0,
                animation: `confetti-fall ${0.7 + i * 0.1}s ease-in ${i * 0.08}s both`,
              }}
            />
          ))}
        </div>

        <div className="text-5xl mb-3">🎉</div>
        <h2 className="text-4xl font-black mb-1" style={{ background: 'linear-gradient(90deg, #e91e8c, #ffd600)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          BINGO!
        </h2>
        <p className="text-text-muted text-sm mb-5">You completed a line!</p>

        <button
          onClick={handleShare}
          className="w-full font-bold py-3 px-6 rounded-xl text-white mb-3 active:scale-95 transition-transform duration-150 text-sm"
          style={{ background: 'linear-gradient(135deg, #9c27b0, #e91e8c)', boxShadow: '0 4px 16px rgba(233,30,140,0.4)' }}
        >
          {copied ? '✓ Copied to clipboard!' : '📤 Share your win'}
        </button>

        <button
          onClick={onDismiss}
          className="w-full font-bold py-3 px-6 rounded-xl active:scale-95 transition-transform duration-150 text-sm"
          style={{ background: '#2a1a4a', border: '1px solid #3d2870', color: '#9e86cc' }}
        >
          Keep Playing
        </button>
      </div>
    </div>
  );
}

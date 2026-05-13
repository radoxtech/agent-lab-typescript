import type { BingoSquareData } from '../types';
import type { QuestionTheme } from '../data/themes';
import { BingoBoard } from './BingoBoard';

interface GameScreenProps {
  board: BingoSquareData[];
  winningSquareIds: Set<number>;
  hasBingo: boolean;
  theme: QuestionTheme;
  onSquareClick: (squareId: number) => void;
  onReset: () => void;
}

export function GameScreen({
  board,
  winningSquareIds,
  hasBingo,
  theme,
  onSquareClick,
  onReset,
}: GameScreenProps) {
  return (
    <div className="flex flex-col min-h-full" style={{ background: '#0f0a1e' }}>
      {/* Header */}
      <header
        className="flex items-center justify-between px-3 py-2.5"
        style={{ background: '#1e1333', borderBottom: '1px solid #3d2870' }}
      >
        <button
          onClick={onReset}
          className="text-text-muted text-sm px-3 py-1.5 rounded-lg active:bg-surface-elevated transition-colors"
        >
          ← Back
        </button>
        <h1 className="font-bold text-text text-base">
          {theme.emoji} {theme.name}
        </h1>
        <div className="w-16" />
      </header>

      {/* Instructions */}
      <p className="text-center text-text-muted text-xs py-2 px-4">
        Tap a square when you find someone who matches it.
      </p>

      {/* Bingo banner */}
      {hasBingo && (
        <div
          className="text-center py-2 font-bold text-sm animate-fade-in"
          style={{ background: 'linear-gradient(90deg, #e91e8c22, #ffd60022, #e91e8c22)', color: '#ffd600', borderTop: '1px solid #ffd60044', borderBottom: '1px solid #ffd60044' }}
        >
          🎉 BINGO! You got a line!
        </div>
      )}

      {/* Board */}
      <div className="flex-1 flex items-center justify-center p-3">
        <BingoBoard
          board={board}
          winningSquareIds={winningSquareIds}
          onSquareClick={onSquareClick}
        />
      </div>
    </div>
  );
}

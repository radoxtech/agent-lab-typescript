import type { BingoSquareData } from '../types';

interface BingoSquareProps {
  square: BingoSquareData;
  isWinning: boolean;
  onClick: () => void;
}

export function BingoSquare({ square, isWinning, onClick }: BingoSquareProps) {
  let background: string;
  let border: string;
  let color: string;
  let boxShadow: string | undefined;

  if (square.isFreeSpace) {
    background = 'linear-gradient(135deg, #1a0d38, #2a1a4a)';
    border = '1px solid #3d2870';
    color = '#9e86cc';
    boxShadow = undefined;
  } else if (isWinning) {
    background = 'linear-gradient(135deg, #2a1a00, #3d2a00)';
    border = '1.5px solid #ffd600';
    color = '#ffd600';
    boxShadow = '0 0 10px rgba(255, 214, 0, 0.4)';
  } else if (square.isMarked) {
    background = 'linear-gradient(135deg, #0a2e2a, #0d3d35)';
    border = '1.5px solid #00c9b1';
    color = '#00c9b1';
    boxShadow = undefined;
  } else {
    background = '#1e1333';
    border = '1px solid #3d2870';
    color = '#c8b8e8';
    boxShadow = undefined;
  }

  return (
    <button
      onClick={onClick}
      disabled={square.isFreeSpace}
      className="relative flex items-center justify-center p-1 text-center rounded-lg transition-all duration-150 select-none min-h-[60px] text-xs leading-tight active:scale-95"
      style={{ background, border, color, boxShadow }}
      aria-pressed={square.isMarked}
      aria-label={square.isFreeSpace ? 'Free space' : square.text}
    >
      <span className="wrap-break-word hyphens-auto">{square.text}</span>
      {square.isMarked && !square.isFreeSpace && (
        <span className="absolute top-0.5 right-0.5 text-[10px]" style={{ color: isWinning ? '#ffd600' : '#00c9b1' }}>✓</span>
      )}
    </button>
  );
}

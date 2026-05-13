import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useBingoGame } from './useBingoGame';

// Minimal 24-item pool for tests that need a custom pool
const CUSTOM_POOL = Array.from({ length: 24 }, (_, i) => `Custom Q${i + 1}`);

// localStorage mock — jsdom provides a real implementation; clear it between tests
beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});

describe('useBingoGame', () => {
  describe('initial state', () => {
    it('starts in the "start" game state', () => {
      const { result } = renderHook(() => useBingoGame());
      expect(result.current.gameState).toBe('start');
    });

    it('starts with an empty board', () => {
      const { result } = renderHook(() => useBingoGame());
      expect(result.current.board).toHaveLength(0);
    });

    it('starts with no winning line', () => {
      const { result } = renderHook(() => useBingoGame());
      expect(result.current.winningLine).toBeNull();
    });

    it('starts with an empty winning square IDs set', () => {
      const { result } = renderHook(() => useBingoGame());
      expect(result.current.winningSquareIds.size).toBe(0);
    });

    it('starts with the bingo modal hidden', () => {
      const { result } = renderHook(() => useBingoGame());
      expect(result.current.showBingoModal).toBe(false);
    });
  });

  describe('startGame', () => {
    it('transitions gameState to "playing"', () => {
      const { result } = renderHook(() => useBingoGame());
      act(() => {
        result.current.startGame();
      });
      expect(result.current.gameState).toBe('playing');
    });

    it('generates a 25-square board', () => {
      const { result } = renderHook(() => useBingoGame());
      act(() => {
        result.current.startGame();
      });
      expect(result.current.board).toHaveLength(25);
    });

    it('places a free space in the center (index 12)', () => {
      const { result } = renderHook(() => useBingoGame());
      act(() => {
        result.current.startGame();
      });
      expect(result.current.board[12].isFreeSpace).toBe(true);
      expect(result.current.board[12].isMarked).toBe(true);
    });

    it('uses the custom question pool when provided', () => {
      const { result } = renderHook(() => useBingoGame(CUSTOM_POOL));
      act(() => {
        result.current.startGame();
      });
      const texts = result.current.board
        .filter((s) => !s.isFreeSpace)
        .map((s) => s.text);
      texts.forEach((text) => {
        expect(CUSTOM_POOL).toContain(text);
      });
    });

    it('clears any previous winning line on restart', async () => {
      const { result } = renderHook(() => useBingoGame());
      act(() => { result.current.startGame(); });

      // Manually mark first row to create a bingo state
      await act(async () => {
        for (const id of [0, 1, 2, 3, 4]) {
          if (!result.current.board[id].isMarked) {
            result.current.handleSquareClick(id);
          }
        }
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // Start again — winningLine should be cleared
      act(() => { result.current.startGame(); });
      expect(result.current.winningLine).toBeNull();
    });
  });

  describe('resetGame', () => {
    it('transitions back to "start"', () => {
      const { result } = renderHook(() => useBingoGame());
      act(() => { result.current.startGame(); });
      act(() => { result.current.resetGame(); });
      expect(result.current.gameState).toBe('start');
    });

    it('empties the board', () => {
      const { result } = renderHook(() => useBingoGame());
      act(() => { result.current.startGame(); });
      act(() => { result.current.resetGame(); });
      expect(result.current.board).toHaveLength(0);
    });

    it('clears the winning line', () => {
      const { result } = renderHook(() => useBingoGame());
      act(() => { result.current.startGame(); });
      act(() => { result.current.resetGame(); });
      expect(result.current.winningLine).toBeNull();
    });

    it('hides the bingo modal', () => {
      const { result } = renderHook(() => useBingoGame());
      act(() => { result.current.startGame(); });
      act(() => { result.current.resetGame(); });
      expect(result.current.showBingoModal).toBe(false);
    });
  });

  describe('handleSquareClick', () => {
    it('marks an unmarked square', () => {
      const { result } = renderHook(() => useBingoGame());
      act(() => { result.current.startGame(); });

      const targetId = result.current.board.find((s) => !s.isFreeSpace)!.id;
      act(() => { result.current.handleSquareClick(targetId); });

      const square = result.current.board.find((s) => s.id === targetId)!;
      expect(square.isMarked).toBe(true);
    });

    it('unmarks an already-marked square', () => {
      const { result } = renderHook(() => useBingoGame());
      act(() => { result.current.startGame(); });

      const targetId = result.current.board.find((s) => !s.isFreeSpace)!.id;
      act(() => { result.current.handleSquareClick(targetId); }); // mark
      act(() => { result.current.handleSquareClick(targetId); }); // unmark

      const square = result.current.board.find((s) => s.id === targetId)!;
      expect(square.isMarked).toBe(false);
    });

    it('does not affect the free space square', () => {
      const { result } = renderHook(() => useBingoGame());
      act(() => { result.current.startGame(); });

      const freeSpaceId = result.current.board.find((s) => s.isFreeSpace)!.id;
      act(() => { result.current.handleSquareClick(freeSpaceId); });

      const square = result.current.board.find((s) => s.id === freeSpaceId)!;
      expect(square.isMarked).toBe(true); // still marked (free space)
      expect(square.isFreeSpace).toBe(true);
    });
  });

  describe('bingo detection', () => {
    it('sets gameState to "bingo" when a winning line is completed', async () => {
      const { result } = renderHook(() => useBingoGame());
      act(() => { result.current.startGame(); });

      await act(async () => {
        for (const id of [0, 1, 2, 3, 4]) {
          if (!result.current.board[id].isMarked) {
            result.current.handleSquareClick(id);
          }
        }
        // Wait for queueMicrotask callbacks to flush
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(result.current.gameState).toBe('bingo');
    });

    it('shows the bingo modal when a winning line is completed', async () => {
      const { result } = renderHook(() => useBingoGame());
      act(() => { result.current.startGame(); });

      await act(async () => {
        for (const id of [0, 1, 2, 3, 4]) {
          if (!result.current.board[id].isMarked) {
            result.current.handleSquareClick(id);
          }
        }
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(result.current.showBingoModal).toBe(true);
    });

    it('sets a non-null winning line when bingo is achieved', async () => {
      const { result } = renderHook(() => useBingoGame());
      act(() => { result.current.startGame(); });

      await act(async () => {
        for (const id of [0, 1, 2, 3, 4]) {
          if (!result.current.board[id].isMarked) {
            result.current.handleSquareClick(id);
          }
        }
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(result.current.winningLine).not.toBeNull();
    });

    it('populates winningSquareIds when bingo is achieved', async () => {
      const { result } = renderHook(() => useBingoGame());
      act(() => { result.current.startGame(); });

      await act(async () => {
        for (const id of [0, 1, 2, 3, 4]) {
          if (!result.current.board[id].isMarked) {
            result.current.handleSquareClick(id);
          }
        }
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(result.current.winningSquareIds.size).toBeGreaterThan(0);
    });
  });

  describe('dismissModal', () => {
    it('hides the bingo modal without changing gameState', async () => {
      const { result } = renderHook(() => useBingoGame());
      act(() => { result.current.startGame(); });

      await act(async () => {
        for (const id of [0, 1, 2, 3, 4]) {
          if (!result.current.board[id].isMarked) {
            result.current.handleSquareClick(id);
          }
        }
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(result.current.showBingoModal).toBe(true);

      act(() => { result.current.dismissModal(); });

      expect(result.current.showBingoModal).toBe(false);
      expect(result.current.gameState).toBe('bingo'); // still in bingo state
    });
  });

  describe('localStorage persistence', () => {
    it('saves game state to localStorage when it changes', () => {
      const { result } = renderHook(() => useBingoGame());
      act(() => { result.current.startGame(); });

      const saved = localStorage.getItem('bingo-game-state');
      expect(saved).not.toBeNull();

      const parsed = JSON.parse(saved!);
      expect(parsed.gameState).toBe('playing');
      expect(parsed.board).toHaveLength(25);
    });

    it('restores game state from localStorage on mount', () => {
      const { result: first } = renderHook(() => useBingoGame());
      act(() => { first.current.startGame(); });

      // Simulate a fresh mount by rendering a new hook instance
      const { result: second } = renderHook(() => useBingoGame());
      expect(second.current.gameState).toBe('playing');
      expect(second.current.board).toHaveLength(25);
    });

    it('starts fresh if localStorage contains invalid data', () => {
      localStorage.setItem('bingo-game-state', 'not-valid-json{{{');
      const { result } = renderHook(() => useBingoGame());
      expect(result.current.gameState).toBe('start');
      expect(result.current.board).toHaveLength(0);
    });

    it('starts fresh if localStorage version does not match', () => {
      const badData = JSON.stringify({ version: 999, gameState: 'playing', board: [], winningLine: null });
      localStorage.setItem('bingo-game-state', badData);
      const { result } = renderHook(() => useBingoGame());
      expect(result.current.gameState).toBe('start');
    });
  });
});

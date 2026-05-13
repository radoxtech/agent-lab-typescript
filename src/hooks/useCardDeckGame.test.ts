import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCardDeckGame } from './useCardDeckGame';
import { questions } from '../data/questions';

const CUSTOM_POOL = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'];

describe('useCardDeckGame', () => {
  describe('initial state', () => {
    it('starts with drawCount of 1', () => {
      const { result } = renderHook(() => useCardDeckGame());
      expect(result.current.drawCount).toBe(1);
    });

    it('starts with successCount of 0', () => {
      const { result } = renderHook(() => useCardDeckGame());
      expect(result.current.successCount).toBe(0);
    });

    it('starts with failCount of 0', () => {
      const { result } = renderHook(() => useCardDeckGame());
      expect(result.current.failCount).toBe(0);
    });

    it('starts with a non-empty current card from the default pool', () => {
      const { result } = renderHook(() => useCardDeckGame());
      expect(questions).toContain(result.current.currentCard);
    });

    it('starts with a card from the custom pool when provided', () => {
      const { result } = renderHook(() => useCardDeckGame(CUSTOM_POOL));
      expect(CUSTOM_POOL).toContain(result.current.currentCard);
    });
  });

  describe('nextCard', () => {
    it('increments drawCount by 1 on success', () => {
      const { result } = renderHook(() => useCardDeckGame(CUSTOM_POOL));
      act(() => { result.current.nextCard('success'); });
      expect(result.current.drawCount).toBe(2);
    });

    it('increments drawCount by 1 on fail', () => {
      const { result } = renderHook(() => useCardDeckGame(CUSTOM_POOL));
      act(() => { result.current.nextCard('fail'); });
      expect(result.current.drawCount).toBe(2);
    });

    it('increments successCount on success', () => {
      const { result } = renderHook(() => useCardDeckGame(CUSTOM_POOL));
      act(() => { result.current.nextCard('success'); });
      expect(result.current.successCount).toBe(1);
    });

    it('does not increment failCount on success', () => {
      const { result } = renderHook(() => useCardDeckGame(CUSTOM_POOL));
      act(() => { result.current.nextCard('success'); });
      expect(result.current.failCount).toBe(0);
    });

    it('increments failCount on fail', () => {
      const { result } = renderHook(() => useCardDeckGame(CUSTOM_POOL));
      act(() => { result.current.nextCard('fail'); });
      expect(result.current.failCount).toBe(1);
    });

    it('does not increment successCount on fail', () => {
      const { result } = renderHook(() => useCardDeckGame(CUSTOM_POOL));
      act(() => { result.current.nextCard('fail'); });
      expect(result.current.successCount).toBe(0);
    });

    it('serves a card from the custom pool after drawing', () => {
      const { result } = renderHook(() => useCardDeckGame(CUSTOM_POOL));
      act(() => { result.current.nextCard('success'); });
      expect(CUSTOM_POOL).toContain(result.current.currentCard);
    });

    it('accumulates multiple successes and fails independently', () => {
      const { result } = renderHook(() => useCardDeckGame(CUSTOM_POOL));
      act(() => { result.current.nextCard('success'); });
      act(() => { result.current.nextCard('fail'); });
      act(() => { result.current.nextCard('success'); });
      expect(result.current.successCount).toBe(2);
      expect(result.current.failCount).toBe(1);
      expect(result.current.drawCount).toBe(4);
    });

    it('draws through every card without duplicate before reshuffling', () => {
      // Use a pool large enough but track which card appears for poolSize consecutive draws
      const pool = ['A', 'B', 'C', 'D'];
      const { result } = renderHook(() => useCardDeckGame(pool));

      const seen = new Set<string>();
      seen.add(result.current.currentCard);

      // Draw pool.length - 1 more times to exhaust the initial shuffle
      for (let i = 0; i < pool.length - 1; i++) {
        act(() => { result.current.nextCard('success'); });
        seen.add(result.current.currentCard);
      }

      expect(seen.size).toBe(pool.length);
    });
  });

  describe('resetDeck', () => {
    it('resets successCount to 0', () => {
      const { result } = renderHook(() => useCardDeckGame(CUSTOM_POOL));
      act(() => { result.current.nextCard('success'); });
      act(() => { result.current.nextCard('success'); });
      act(() => { result.current.resetDeck(); });
      expect(result.current.successCount).toBe(0);
    });

    it('resets failCount to 0', () => {
      const { result } = renderHook(() => useCardDeckGame(CUSTOM_POOL));
      act(() => { result.current.nextCard('fail'); });
      act(() => { result.current.resetDeck(); });
      expect(result.current.failCount).toBe(0);
    });

    it('resets drawCount to 1', () => {
      const { result } = renderHook(() => useCardDeckGame(CUSTOM_POOL));
      act(() => { result.current.nextCard('success'); });
      act(() => { result.current.nextCard('fail'); });
      act(() => { result.current.resetDeck(); });
      expect(result.current.drawCount).toBe(1);
    });

    it('serves a valid card from the pool after reset', () => {
      const { result } = renderHook(() => useCardDeckGame(CUSTOM_POOL));
      act(() => { result.current.nextCard('success'); });
      act(() => { result.current.resetDeck(); });
      expect(CUSTOM_POOL).toContain(result.current.currentCard);
    });
  });

  describe('default pool fallback', () => {
    it('uses the default questions pool when no pool is provided', () => {
      const { result } = renderHook(() => useCardDeckGame());
      expect(questions).toContain(result.current.currentCard);
    });

    it('uses the default pool when an empty array is passed', () => {
      const { result } = renderHook(() => useCardDeckGame([]));
      expect(questions).toContain(result.current.currentCard);
    });
  });
});

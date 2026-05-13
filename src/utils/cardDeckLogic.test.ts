import { describe, expect, it } from 'vitest';
import { applyDeckResult, drawFromDeck, drawRandomQuestion } from './cardDeckLogic';

describe('cardDeckLogic', () => {
  describe('drawRandomQuestion', () => {
    it('returns a value from the provided pool', () => {
      const pool = ['A', 'B', 'C'];
      const question = drawRandomQuestion(pool, () => 0.4);
      expect(pool).toContain(question);
    });

    it('throws when pool is empty', () => {
      expect(() => drawRandomQuestion([])).toThrowError('Question pool cannot be empty');
    });
  });

  describe('applyDeckResult', () => {
    it('increments success count for success result', () => {
      const updated = applyDeckResult({ success: 1, fail: 2 }, 'success');
      expect(updated).toEqual({ success: 2, fail: 2 });
    });

    it('increments fail count for fail result', () => {
      const updated = applyDeckResult({ success: 1, fail: 2 }, 'fail');
      expect(updated).toEqual({ success: 1, fail: 3 });
    });
  });

  describe('drawFromDeck', () => {
    it('draws through all cards without replacement before reshuffling', () => {
      const pool = ['A', 'B', 'C'];
      let drawPile: string[] = [];
      const seen = new Set<string>();
      const random = () => 0.25;

      for (let i = 0; i < pool.length; i++) {
        const draw = drawFromDeck(drawPile, pool, random);
        seen.add(draw.currentCard);
        drawPile = draw.drawPile;
      }

      expect(seen.size).toBe(pool.length);
      expect(drawPile).toHaveLength(0);
    });

    it('reshuffles and continues when the draw pile is exhausted', () => {
      const pool = ['A', 'B', 'C'];
      const draw = drawFromDeck([], pool, () => 0.4);
      expect(pool).toContain(draw.currentCard);
      expect(draw.drawPile).toHaveLength(2);
    });

    it('throws when pool is empty', () => {
      expect(() => drawFromDeck([], [])).toThrowError('Question pool cannot be empty');
    });
  });
});

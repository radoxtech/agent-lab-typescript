import { describe, expect, it } from 'vitest';
import { applyDeckResult, drawRandomQuestion } from './cardDeckLogic';

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
});

export type DeckResult = 'fail' | 'success';

export interface DeckStats {
  success: number;
  fail: number;
}

export function drawRandomQuestion(pool: string[], random = Math.random): string {
  if (pool.length === 0) {
    throw new Error('Question pool cannot be empty');
  }

  const index = Math.floor(random() * pool.length);
  return pool[index];
}

export function applyDeckResult(stats: DeckStats, result: DeckResult): DeckStats {
  if (result === 'success') {
    return { ...stats, success: stats.success + 1 };
  }

  return { ...stats, fail: stats.fail + 1 };
}

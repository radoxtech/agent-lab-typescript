export type DeckResult = 'fail' | 'success';

export interface DeckStats {
  success: number;
  fail: number;
}

export interface DeckDraw {
  currentCard: string;
  drawPile: string[];
}

function shufflePool(pool: string[], random = Math.random): string[] {
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function drawRandomQuestion(pool: string[], random = Math.random): string {
  if (pool.length === 0) {
    throw new Error('Question pool cannot be empty');
  }

  const index = Math.floor(random() * pool.length);
  return pool[index];
}

export function drawFromDeck(drawPile: string[], pool: string[], random = Math.random): DeckDraw {
  if (pool.length === 0) {
    throw new Error('Question pool cannot be empty');
  }

  const activePile = drawPile.length > 0 ? drawPile : shufflePool(pool, random);

  return {
    currentCard: activePile[0],
    drawPile: activePile.slice(1),
  };
}

export function applyDeckResult(stats: DeckStats, result: DeckResult): DeckStats {
  if (result === 'success') {
    return { ...stats, success: stats.success + 1 };
  }

  return { ...stats, fail: stats.fail + 1 };
}

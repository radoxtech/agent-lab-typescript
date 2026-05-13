import { useCallback, useMemo, useState } from 'react';
import { questions } from '../data/questions';
import { applyDeckResult, drawFromDeck, type DeckResult } from '../utils/cardDeckLogic';

export interface CardDeckGameState {
  currentCard: string;
  successCount: number;
  failCount: number;
  drawCount: number;
}

export interface CardDeckGameActions {
  nextCard: (result: DeckResult) => void;
  resetDeck: () => void;
}

interface CardDeckSessionState extends CardDeckGameState {
  drawPile: string[];
}

function createInitialState(pool: string[]): CardDeckSessionState {
  const firstDraw = drawFromDeck([], pool);
  return {
    currentCard: firstDraw.currentCard,
    drawPile: firstDraw.drawPile,
    successCount: 0,
    failCount: 0,
    drawCount: 1,
  };
}

export function useCardDeckGame(questionPool?: string[]): CardDeckGameState & CardDeckGameActions {
  const pool = useMemo(() => (questionPool && questionPool.length > 0 ? questionPool : questions), [questionPool]);

  const [deckState, setDeckState] = useState<CardDeckSessionState>(() => createInitialState(pool));

  const nextCard = useCallback((result: DeckResult) => {
    setDeckState((current) => {
      const updatedStats = applyDeckResult(
        { success: current.successCount, fail: current.failCount },
        result
      );
      const nextDraw = drawFromDeck(current.drawPile, pool);

      return {
        ...current,
        currentCard: nextDraw.currentCard,
        drawPile: nextDraw.drawPile,
        successCount: updatedStats.success,
        failCount: updatedStats.fail,
        drawCount: current.drawCount + 1,
      };
    });
  }, [pool]);

  const resetDeck = useCallback(() => {
    setDeckState(createInitialState(pool));
  }, [pool]);

  return {
    currentCard: deckState.currentCard,
    successCount: deckState.successCount,
    failCount: deckState.failCount,
    drawCount: deckState.drawCount,
    nextCard,
    resetDeck,
  };
}

import { useCallback, useState } from 'react';
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

function createInitialState(): CardDeckSessionState {
  const firstDraw = drawFromDeck([], questions);
  return {
    currentCard: firstDraw.currentCard,
    drawPile: firstDraw.drawPile,
    successCount: 0,
    failCount: 0,
    drawCount: 1,
  };
}

export function useCardDeckGame(): CardDeckGameState & CardDeckGameActions {
  const [deckState, setDeckState] = useState<CardDeckSessionState>(createInitialState);

  const nextCard = useCallback((result: DeckResult) => {
    setDeckState((current) => {
      const updatedStats = applyDeckResult(
        { success: current.successCount, fail: current.failCount },
        result
      );
      const nextDraw = drawFromDeck(current.drawPile, questions);

      return {
        ...current,
        currentCard: nextDraw.currentCard,
        drawPile: nextDraw.drawPile,
        successCount: updatedStats.success,
        failCount: updatedStats.fail,
        drawCount: current.drawCount + 1,
      };
    });
  }, []);

  const resetDeck = useCallback(() => {
    setDeckState(createInitialState());
  }, []);

  return {
    currentCard: deckState.currentCard,
    successCount: deckState.successCount,
    failCount: deckState.failCount,
    drawCount: deckState.drawCount,
    nextCard,
    resetDeck,
  };
}

import { useCallback, useState } from 'react';
import { questions } from '../data/questions';
import { drawRandomQuestion, type DeckResult } from '../utils/cardDeckLogic';

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

export function useCardDeckGame(): CardDeckGameState & CardDeckGameActions {
  const [currentCard, setCurrentCard] = useState<string>(() => drawRandomQuestion(questions));
  const [successCount, setSuccessCount] = useState(0);
  const [failCount, setFailCount] = useState(0);
  const [drawCount, setDrawCount] = useState(1);

  const nextCard = useCallback((result: DeckResult) => {
    if (result === 'success') {
      setSuccessCount((count) => count + 1);
    } else {
      setFailCount((count) => count + 1);
    }
    setCurrentCard(drawRandomQuestion(questions));
    setDrawCount((count) => count + 1);
  }, []);

  const resetDeck = useCallback(() => {
    setSuccessCount(0);
    setFailCount(0);
    setDrawCount(1);
    setCurrentCard(drawRandomQuestion(questions));
  }, []);

  return {
    currentCard,
    successCount,
    failCount,
    drawCount,
    nextCard,
    resetDeck,
  };
}

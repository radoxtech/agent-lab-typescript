import { useState } from 'react';
import { useBingoGame } from './hooks/useBingoGame';
import { useCardDeckGame } from './hooks/useCardDeckGame';
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';
import { CardDeckScreen } from './components/CardDeckScreen';
import { BingoModal } from './components/BingoModal';

function App() {
  const {
    gameState,
    board,
    winningSquareIds,
    showBingoModal,
    startGame,
    handleSquareClick,
    resetGame,
    dismissModal,
  } = useBingoGame();

  const {
    currentCard,
    successCount,
    failCount,
    drawCount,
    nextCard,
    resetDeck,
  } = useCardDeckGame();

  const [mode, setMode] = useState<'start' | 'deck'>('start');

  const handleStartClassic = () => {
    startGame();
  };

  const handleStartDeck = () => {
    resetDeck();
    setMode('deck');
  };

  const handleBackFromBingo = () => {
    resetGame();
    setMode('start');
  };

  if (mode === 'start' && gameState === 'start') {
    return (
      <StartScreen
        onStartClassic={handleStartClassic}
        onStartDeck={handleStartDeck}
      />
    );
  }

  if (mode === 'deck') {
    return (
      <CardDeckScreen
        currentCard={currentCard}
        successCount={successCount}
        failCount={failCount}
        drawCount={drawCount}
        onFail={() => nextCard('fail')}
        onSuccess={() => nextCard('success')}
        onBack={() => setMode('start')}
      />
    );
  }

  return (
    <>
      <GameScreen
        board={board}
        winningSquareIds={winningSquareIds}
        hasBingo={gameState === 'bingo'}
        onSquareClick={handleSquareClick}
        onReset={handleBackFromBingo}
      />
      {showBingoModal && (
        <BingoModal onDismiss={dismissModal} />
      )}
    </>
  );
}

export default App;

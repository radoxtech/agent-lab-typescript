import { useState } from 'react';
import { useBingoGame } from './hooks/useBingoGame';
import { useCardDeckGame } from './hooks/useCardDeckGame';
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';
import { CardDeckScreen } from './components/CardDeckScreen';
import { BingoModal } from './components/BingoModal';
import { themes, defaultTheme } from './data/questions';
import type { QuestionTheme } from './data/questions';

function App() {
  const [selectedTheme, setSelectedTheme] = useState<QuestionTheme>(defaultTheme);

  const {
    gameState,
    board,
    winningSquareIds,
    showBingoModal,
    startGame,
    handleSquareClick,
    resetGame,
    dismissModal,
  } = useBingoGame(selectedTheme.questions);

  const {
    currentCard,
    successCount,
    failCount,
    drawCount,
    nextCard,
    resetDeck,
  } = useCardDeckGame(selectedTheme.questions);

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
        themes={themes}
        selectedTheme={selectedTheme}
        onSelectTheme={setSelectedTheme}
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
        theme={selectedTheme}
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
        theme={selectedTheme}
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

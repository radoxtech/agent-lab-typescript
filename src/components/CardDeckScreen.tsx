interface CardDeckScreenProps {
  currentCard: string;
  successCount: number;
  failCount: number;
  drawCount: number;
  onFail: () => void;
  onSuccess: () => void;
  onBack: () => void;
}

export function CardDeckScreen({
  currentCard,
  successCount,
  failCount,
  drawCount,
  onFail,
  onSuccess,
  onBack,
}: CardDeckScreenProps) {
  return (
    <div className="flex flex-col min-h-full bg-gray-50">
      <header className="flex items-center justify-between p-3 bg-white border-b border-gray-200">
        <button
          onClick={onBack}
          className="text-gray-500 text-sm px-3 py-1.5 rounded active:bg-gray-100"
        >
          ← Back
        </button>
        <h1 className="font-bold text-gray-900">Card Deck Shuffle</h1>
        <div className="w-16" />
      </header>

      <p className="text-center text-gray-500 text-sm py-2 px-4">
        Draw #{drawCount}: mark fail or success based on your result, then get another random card.
      </p>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm">
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-3">Question card</p>
          <p className="text-2xl font-semibold text-gray-900">{currentCard}</p>
        </div>
      </div>

      <div className="px-4 pb-4">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onFail}
            className="bg-rose-500 text-white font-semibold py-3 rounded-lg active:bg-rose-400 transition-colors"
          >
            ← Fail
          </button>
          <button
            onClick={onSuccess}
            className="bg-emerald-600 text-white font-semibold py-3 rounded-lg active:bg-emerald-500 transition-colors"
          >
            Success →
          </button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-3">
          Success: {successCount} · Fail: {failCount}
        </p>
      </div>
    </div>
  );
}

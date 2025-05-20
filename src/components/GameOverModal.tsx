type GameOverModalProps = {
  isVisible: boolean;
  score: number;
  wordCount: number;
  message?: string;
  onRestartGame: () => void;
};

const GameOverModal: React.FC<GameOverModalProps> = ({
  isVisible,
  score,
  wordCount,
  message,
  onRestartGame,
}) => {
  return (
    <div className="modal" style={{ display: isVisible ? "flex" : "none" }}>
      <div className="modal-content">
        <h2>Game Over!</h2>
        <p>{message || "You've run out of time or got stuck."}</p>
        <div className="final-score">Score: {score}</div>
        <p>You made {wordCount} word connections!</p>
        <button className="play-again-btn" onClick={onRestartGame}>
          Play Again
        </button>
      </div>
    </div>
  );
};

export default GameOverModal;

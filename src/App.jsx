import { useState, useEffect, useRef } from "react";
import WordInput from "./components/WordInput";
import WordList from "./components/WordList";
import PointsPopup from "./components/PointsPopup";
import GameOverModal from "./components/GameOverModal";
import "./App.css";

function App() {
  const starterWords = ["orange", "dream", "boat", "cat"];
  const startWord =
    starterWords[Math.floor(Math.random() * starterWords.length)];

  const [usedWords, setUsedWords] = useState([startWord]);
  const [currentLetter, setCurrentLetter] = useState(startWord.slice(-1));
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isGameOver, setIsGameOver] = useState(false);
  const [pointsPopup, setPointsPopup] = useState({
    show: false,
    points: 0,
    x: 0,
    y: 0,
  });

  const gameContainerRef = useRef(null);

  useEffect(() => {
    if (timeLeft > 0 && !isGameOver) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (timeLeft === 0 && !isGameOver) {
      endGame("Time's up!");
    }
  }, [timeLeft, isGameOver]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const endGame = (reason) => {
    setIsGameOver(true);
    setMessage(reason);
  };

  const restartGame = () => {
    const newStartWord =
      starterWords[Math.floor(Math.random() * starterWords.length)];
    setUsedWords([newStartWord]);
    setCurrentLetter(newStartWord.slice(-1));
    setScore(0);
    setTimeLeft(60);
    setIsGameOver(false);
    setMessage("");
  };

  const showPointsPopup = (points) => {
    if (!gameContainerRef.current) return;

    const container = gameContainerRef.current.getBoundingClientRect();
    const x = Math.random() * (container.width - 100) + 50;
    const y = Math.random() * (container.height - 100) + 50;

    setPointsPopup({ show: true, points, x, y });

    setTimeout(
      () => setPointsPopup({ show: false, points: 0, x: 0, y: 0 }),
      1000
    );
  };

  const calculatePoints = (word) => {
    return word.length * 5;
  };

  const addWord = async (word) => {
    if (usedWords.includes(word)) {
      return setMessage("Word already used.");
    }

    if (word[0] !== currentLetter) {
      return setMessage(`Word must start with '${currentLetter}'.`);
    }

    try {
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );

      if (!res.ok) {
        return setMessage("Not a valid English word.");
      }

      const points = calculatePoints(word);
      setScore((prevScore) => prevScore + points);
      showPointsPopup(points);

      setUsedWords([...usedWords, word]);
      setCurrentLetter(word.slice(-1));
      setMessage("Good one!");
    } catch (error) {
      console.error("Error checking word:", error);
      setMessage("There was an error checking your word.");
    }
  };

  return (
    <div className="app">
      <div className="game-info">
        <div className="timer">
          <span>Time:</span>
          <div className="timer-bar">
            <div
              className="timer-progress"
              style={{ width: `${(timeLeft / 60) * 100}%` }}
            ></div>
          </div>
          <span>{formatTime(timeLeft)}</span>
        </div>
        <h1 className="title">ChainWords</h1>
        <div className="score">
          <span>Score:</span>
          <span id="score-value">{score}</span>
        </div>
      </div>

      <div className="game-container" ref={gameContainerRef}>
        <WordList words={usedWords} currentIndex={usedWords.length - 1} />

        <WordInput
          onSubmit={addWord}
          currentLetter={currentLetter}
          isGameOver={isGameOver}
        />

        <div className="instructions">
          <p>
            Enter a word that starts with the last letter of "
            {usedWords[usedWords.length - 1].toUpperCase()}"
          </p>
          <p>{message}</p>
        </div>
      </div>

      {/* Points popup */}
      <PointsPopup
        points={pointsPopup.points}
        x={pointsPopup.x}
        y={pointsPopup.y}
        show={pointsPopup.show}
      />

      {/* Game Over Modal */}
      <GameOverModal
        isVisible={isGameOver}
        score={score}
        wordCount={usedWords.length - 1}
        message={message}
        onRestartGame={restartGame}
      />

      <footer className="footer">
        <p>© 2025 ChainWords | The Word Chain Game</p>
      </footer>
    </div>
  );
}

export default App;

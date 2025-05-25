import {
  useState,
  useEffect,
  useRef,
  FormEvent,
  ChangeEvent,
  KeyboardEvent,
} from "react";

type WordInputProps = {
  onSubmit: (word: string) => void;
  currentLetter: string;
  isGameOver: boolean;
};

const WordInput: React.FC<WordInputProps> = ({
  onSubmit,
  currentLetter,
  isGameOver,
}) => {
  const [input, setInput] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && !isGameOver) {
      inputRef.current.focus();
    }
  }, [currentLetter, isGameOver]);

  const handleSubmit = (e?: FormEvent) => {
    if (e) e.preventDefault();
    const word = input.trim().toLowerCase();
    if (word) onSubmit(word);
    setInput("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="input-container">
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder={`Type a word starting with '${currentLetter.toUpperCase()}'`}
          className="word-input"
          disabled={isGameOver}
        />
        <button
          type="submit"
          className="submit-btn"
          disabled={isGameOver || !input.trim()}
        >
          Go
        </button>
      </form>
    </div>
  );
};

export default WordInput;

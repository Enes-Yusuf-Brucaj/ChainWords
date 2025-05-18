import { useState } from "react";
import WordInput from "./components/WordInput";
import WordList from "./components/WordList";

function App() {
  const starterWords = ["apple", "dream", "boat", "cat"];
  const startWord =
    starterWords[Math.floor(Math.random() * starterWords.length)];

  const [usedWords, setUsedWords] = useState([startWord]);
  const [currentLetter, setCurrentLetter] = useState(startWord.slice(-1));
  const [message, setMessage] = useState("");

  const addWord = async (word) => {
    if (usedWords.includes(word)) return setMessage("⚠️ Word already used.");
    if (word[0] !== currentLetter)
      return setMessage(`⚠️ Word must start with '${currentLetter}'.`);

    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    if (!res.ok) return setMessage("❌ Not a valid English word.");

    setUsedWords([...usedWords, word]);
    setCurrentLetter(word.slice(-1));
    setMessage("✅ Good one!");
  };

  return (
    <div className="p-6 max-w-xl mx-auto font-sans text-center">
      <h1 className="text-2xl font-bold mb-4">Chain Word Challenge</h1>
      <p>
        Enter a word that starts with: <strong>{currentLetter}</strong>
      </p>
      <WordInput onSubmit={addWord} />
      <p className="my-2">{message}</p>
      <WordList words={usedWords} />
    </div>
  );
}

export default App;

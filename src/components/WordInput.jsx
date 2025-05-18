import { useState } from "react";

function WordInput({ onSubmit }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const word = input.trim().toLowerCase();
    if (word) onSubmit(word);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a word"
        className="border p-2 rounded mr-2"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-3 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
}

export default WordInput;

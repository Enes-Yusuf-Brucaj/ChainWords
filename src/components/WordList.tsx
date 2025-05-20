type WordListProps = {
  words: string[];
  currentIndex: number;
};

type LetterData = {
  letter: string;
  wordIndex: number;
  isShared: boolean;
  isCurrent: boolean;
};

const WordList: React.FC<WordListProps> = ({ words, currentIndex }) => {
  // Build flat list of letters, removing duplicate shared letters
  const letterChain: LetterData[] = [];

  words.forEach((word, i) => {
    const isLastWord = i === words.length - 1;
    const nextWord = words[i + 1];

    for (let j = 0; j < word.length; j++) {
      const isSharedLetter =
        i < words.length - 1 &&
        j === word.length - 1 &&
        word[word.length - 1] === nextWord?.[0];

      // Only push if it's not a shared letter (to be handled in next word)
      if (!isSharedLetter || i === currentIndex) {
        letterChain.push({
          letter: word[j],
          wordIndex: i,
          isShared: isSharedLetter,
          isCurrent: i === currentIndex,
        });
      }
    }
  });

  // Center on the first letter of the current word (or shared letter)
  const centerIndex = letterChain.findIndex(
    (l) => l.wordIndex === currentIndex && !l.isShared
  );

  const offsetStyle = {
    transform: `translateX(calc(50% - ${centerIndex * 1}ch))`,
  };

  return (
    <div className="word-chain">
      <div className="letter-row" style={offsetStyle}>
        {letterChain.map((l, i) => (
          <span
            key={`${l.letter}-${i}`}
            className={`letter-card word-${l.wordIndex} ${
              l.isCurrent ? "active" : ""
            }`}
          >
            {l.letter.toUpperCase()}
          </span>
        ))}
      </div>
    </div>
  );
};

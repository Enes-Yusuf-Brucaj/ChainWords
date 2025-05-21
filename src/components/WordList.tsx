import React from "react";
import "./WordList.css";

const COLORS = ["#6C5CE7", "#00B894", "#E17055", "#0984E3", "#D63031"];

const WordList = ({
  words,
  currentIndex,
}: {
  words: string[];
  currentIndex: number;
}) => {
  return (
    <div className="word-chain">
      {words.map((word, wordIndex) => {
        const color = COLORS[wordIndex % COLORS.length];
        const nextColor = COLORS[(wordIndex + 1) % COLORS.length];
        const isLastWord = wordIndex === words.length - 1;

        // Skip first letter if it's shared with the previous word
        const lettersToRender =
          wordIndex === 0 ? word.split("") : word.slice(1).split("");

        return (
          <div className="word" key={wordIndex}>
            {lettersToRender.map((letter, letterIndex) => {
              // Adjust actual index in full word
              const actualIndex =
                wordIndex === 0 ? letterIndex : letterIndex + 1;

              const isShared = !isLastWord && actualIndex === word.length - 1;

              return (
                <div
                  key={actualIndex}
                  className={`letter-box ${isShared ? "shared-letter" : ""}`}
                  style={
                    isShared
                      ? {
                          background: `linear-gradient(to right, ${color} 50%, ${nextColor} 50%)`,
                        }
                      : { backgroundColor: color }
                  }
                >
                  {letter.toUpperCase()}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default WordList;

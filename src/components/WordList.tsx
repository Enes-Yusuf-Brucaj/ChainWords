import React, { useState, useEffect, useRef } from "react";
import "./WordList.css";

const COLORS = ["#6C5CE7", "#00B894", "#E17055", "#0984E3", "#D63031"];

type WordListProps = {
  words: string[];
  currentIndex: number;
};

const WordList: React.FC<WordListProps> = ({ words, currentIndex }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom when new words are added
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [words.length]);

  // Calculate word rows based on container width
  const arrangeWordsInRows = (): Array<
    Array<{ word: string; index: number }>
  > => {
    if (!containerWidth) return [words.map((word, index) => ({ word, index }))];

    const rows: Array<Array<{ word: string; index: number }>> = [];
    let currentRow: Array<{ word: string; index: number }> = [];
    let currentRowWidth = 0;
    const letterWidth = 48; // Width of each letter box (40px + gap)
    const wordSpacing = 16; // Space between words
    const maxRowWidth = containerWidth - 40; // Account for padding

    words.forEach((word, wordIndex) => {
      // Calculate letters to render (skip first letter if shared with previous word)
      const lettersToRender = wordIndex === 0 ? word.length : word.length - 1;
      const wordWidth = lettersToRender * letterWidth + wordSpacing;

      if (currentRowWidth + wordWidth > maxRowWidth && currentRow.length > 0) {
        rows.push([...currentRow]);
        currentRow = [{ word, index: wordIndex }];
        currentRowWidth = wordWidth;
      } else {
        currentRow.push({ word, index: wordIndex });
        currentRowWidth += wordWidth;
      }
    });

    if (currentRow.length > 0) {
      rows.push(currentRow);
    }

    return rows;
  };

  const wordRows = arrangeWordsInRows();

  return (
    <div className="word-chain-scrollable" ref={containerRef}>
      <div className="word-rows">
        {wordRows.map((row, rowIndex) => (
          <div key={rowIndex} className="word-chain-row">
            {row.map(({ word, index: wordIndex }) => {
              const color = COLORS[wordIndex % COLORS.length];
              const nextColor = COLORS[(wordIndex + 1) % COLORS.length];
              const isLastWord = wordIndex === words.length - 1;

              // Skip first letter if shared with previous word
              const lettersToRender =
                wordIndex === 0 ? word.split("") : word.slice(1).split("");

              return (
                <div className="word" key={wordIndex}>
                  {lettersToRender.map((letter, letterIndex) => {
                    const actualIndex =
                      wordIndex === 0 ? letterIndex : letterIndex + 1;

                    const isShared =
                      !isLastWord && actualIndex === word.length - 1;

                    return (
                      <div
                        key={actualIndex}
                        className={`letter-box ${
                          isShared ? "shared-letter" : ""
                        }`}
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
        ))}
      </div>
    </div>
  );
};

export default WordList;

import { useEffect, useState } from "react";
import Cell from "./Cell";

const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;

export default function Board() {
  const secretWord = "SLEEP";

  const [board, setBoard] = useState<string[]>(
    Array.from({ length: WORD_LENGTH * MAX_ATTEMPTS }, () => ""),
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [submittedRows, setSubmittedRows] = useState<number[]>([]);
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">(
    "playing",
  );

  useEffect(() => {
    const handleType = (e: KeyboardEvent) => {
      // Stop input when game is over
      if (gameStatus !== "playing") {
        return;
      }

      // =========================
      // LETTER
      // =========================
      if (/^[a-zA-Z]$/.test(e.key)) {
        if (currentIndex >= board.length) {
          return;
        }

        setBoard((prev) => {
          const newBoard = [...prev];
          newBoard[currentIndex] = e.key.toUpperCase();
          return newBoard;
        });

        setCurrentIndex((prev) => prev + 1);

        return;
      }

      // =========================
      // BACKSPACE
      // =========================
      if (e.key === "Backspace") {
        if (currentIndex === 0) {
          return;
        }

        const currentRow = Math.floor(currentIndex / WORD_LENGTH);
        const rowStart = currentRow * WORD_LENGTH;

        if (currentIndex <= rowStart) {
          return;
        }

        const newIndex = currentIndex - 1;

        setBoard((prev) => {
          const newBoard = [...prev];
          newBoard[newIndex] = "";
          return newBoard;
        });

        setCurrentIndex(newIndex);

        return;
      }

      // =========================
      // ENTER
      // =========================
      if (e.key === "Enter") {
        if (currentIndex === 0) {
          return;
        }

        const currentRow = Math.floor((currentIndex - 1) / WORD_LENGTH);

        const rowStart = currentRow * WORD_LENGTH;
        const rowEnd = rowStart + WORD_LENGTH;

        const currentWord = board.slice(rowStart, rowEnd).join("");

        // Word isn't complete
        if (currentWord.length !== WORD_LENGTH) {
          return;
        }

        // Submit row
        setSubmittedRows((prev) => [...prev, currentRow]);

        // =========================
        // WIN
        // =========================
        if (currentWord === secretWord) {
          setGameStatus("won");
          return;
        }

        // =========================
        // LOSE
        // =========================
        if (currentRow === MAX_ATTEMPTS - 1) {
          setGameStatus("lost");
          return;
        }

        // Move to next row
        setCurrentIndex(rowEnd);
      }
    };

    window.addEventListener("keydown", handleType);

    return () => {
      window.removeEventListener("keydown", handleType);
    };
  }, [board, currentIndex, submittedRows, gameStatus]);

  return (
    <>
      <div className="board">
        {board.map((cell, index) => (
          <Cell
            key={index}
            latter={cell}
            secretWord={secretWord}
            index={index}
            submittedRows={submittedRows}
          />
        ))}
      </div>

      {gameStatus === "won" && <h2>You are the winner! 🎉</h2>}

      {gameStatus === "lost" && <h2>You lost! The word was {secretWord}.</h2>}
    </>
  );
}

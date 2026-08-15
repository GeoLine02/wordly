import { useEffect, useState } from "react";
import Cell from "./Cell";

const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;

export default function Board() {
  const secretWord = "SLEEP";

  const [board, setBoard] = useState<string[]>(
    Array.from({ length: 30 }, () => ""),
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  const [submittedRows, setSubmittedRows] = useState<number[]>([]);

  const handleType = (e: KeyboardEvent) => {
    if (submittedRows.length >= MAX_ATTEMPTS) return;

    const currentRow = Math.floor(currentIndex / WORD_LENGTH);

    const currentColumn = currentIndex % WORD_LENGTH;

    if (/^[a-zA-Z]$/.test(e.key)) {
      if (currentColumn >= WORD_LENGTH) return;

      setBoard((prev) => {
        const newBoard = [...prev];
        newBoard[currentIndex] = e.key.toUpperCase();
        return newBoard;
      });

      setCurrentIndex((prev) => prev + 1);
    }

    if (e.key === "Backspace") {
      if (currentColumn === 0) return;

      const newIndex = currentIndex - 1;

      setBoard((prev) => {
        const newBoard = [...prev];
        newBoard[newIndex] = "";
        return newBoard;
      });

      setCurrentIndex(newIndex);
    }

    if (e.key === "Enter") {
      if (currentColumn !== WORD_LENGTH) return;

      setSubmittedRows((prev) => [...prev, currentRow]);

      setCurrentIndex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleType);

    return () => {
      window.removeEventListener("keydown", handleType);
    };
  }, [currentIndex, submittedRows]);

  return (
    <div className="board">
      {board.map((cell, index) => (
        <Cell
          key={index}
          latter={cell}
          secretWord={secretWord}
          index={index}
          board={board}
          submittedRows={submittedRows}
        />
      ))}
    </div>
  );
}

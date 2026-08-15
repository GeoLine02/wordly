interface CellProps {
  latter: string;
  secretWord: string;
  index: number;
  submittedRows: number[];
}

export default function Cell({
  latter,
  secretWord,
  index,
  submittedRows,
}: CellProps) {
  const letter = latter.toUpperCase();
  const word = secretWord.toUpperCase();

  // Example:
  // index 0-4  -> row 0
  // index 5-9  -> row 1
  // index 10-14 -> row 2
  const row = Math.floor(index / 5);

  // Position inside the row
  // 0, 1, 2, 3, 4
  const column = index % 5;

  // Only show result after pressing Enter
  const isSubmitted = submittedRows.includes(row);

  let backgroundColor = "gray";

  if (isSubmitted) {
    // Correct letter + correct position
    if (letter === word[column]) {
      backgroundColor = "green";
    }

    // Correct letter + wrong position
    else if (word.includes(letter)) {
      backgroundColor = "gold";
    }

    // Letter doesn't exist
    else {
      backgroundColor = "gray";
    }
  }

  return (
    <div
      className="cell"
      style={{
        backgroundColor,
      }}
    >
      <h1>{latter}</h1>
    </div>
  );
}

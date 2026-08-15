interface CellProps {
  latter: string;
  secretWord: string;
  index: number;
  board: string[];
  submittedRows: number[];
}

export default function Cell({
  latter,
  secretWord,
  index,
  board,
  submittedRows,
}: CellProps) {
  const letter = latter?.toUpperCase();
  const word = secretWord.toUpperCase();

  const row = Math.floor(index / 5);
  const column = index % 5;

  const isSubmitted = submittedRows.includes(row);

  let backgroundColor = "gray";

  if (isSubmitted) {
    if (letter === word[column]) {
      backgroundColor = "green";
    } else if (word.includes(letter)) {
      backgroundColor = "gold";
    } else {
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

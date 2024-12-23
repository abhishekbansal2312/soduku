import React, { useState } from "react";

export default function SudokuPage() {
  const [board, setBoard] = useState([
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ]);

  const handleInput = (e, rowIndex, colIndex) => {
    const value = e.target.value === "" ? 0 : parseInt(e.target.value, 10);
    if (isNaN(value) || value < 0 || value > 9) return;

    const newBoard = board.map((row, i) =>
      row.map((cell, j) => (i === rowIndex && j === colIndex ? value : cell))
    );
    setBoard(newBoard);

    if (!checkIncorrectValue(rowIndex, colIndex)) {
      e.target.style.backgroundColor = "red";
      return;
    } else {
      e.target.style.backgroundColor = "";
    }
  };

  const checkIncorrectValue = (rowIndex, colIndex) => {
    return (
      checkRow(rowIndex) &&
      checkColumn(colIndex) &&
      checkBox(rowIndex, colIndex)
    );
  };

  const checkRow = (rowIndex) => {
    const row = board[rowIndex].filter((cell) => cell !== 0);
    const uniqueNumbers = new Set(row);
    return uniqueNumbers.size === row.length;
  };
  const checkColumn = (colIndex) => {
    const col = board.map((row) => row[colIndex]).filter((cell) => cell !== 0);
    const uniqueNumbers = new Set(col);
    return uniqueNumbers.size === col.length;
  };

  const checkBox = (rowIndex, colIndex) => {
    const startRow = Math.floor(rowIndex / 3) * 3;
    const startCol = Math.floor(colIndex / 3) * 3;
    const boxValues = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const value = board[startRow + i][startCol + j];
        if (value !== 0) boxValues.push(value);
      }
    }
    const uniqueValues = new Set(boxValues);
    return uniqueValues.size === boxValues.length;
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-2xl font-bold mb-4">Sudoku Game</h1>
      <div className="grid grid-cols-9 gap-0.5 border-4 border-black">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              value={cell || ""}
              max={9}
              min={1}
              onChange={(e) => handleInput(e, rowIndex, colIndex)}
              className={`w-12 h-12 text-center border`}
            />
          ))
        )}
      </div>
    </div>
  );
}

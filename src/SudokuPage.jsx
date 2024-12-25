import React, { useState } from "react";
import Board from "./Board";
import Buttons from "./Buttons";
import { useSelector, useDispatch } from "react-redux";
import { updateBoard } from "./slices/filterSlice";
import { setValidationStatus } from "./slices/validationSlice";
import Timer from "./Timer";

const checkRow = (board, rowIndex) => {
  const row = board[rowIndex].filter((cell) => cell !== 0);
  const uniqueNumbers = new Set(row);
  return uniqueNumbers.size === row.length;
};

const checkColumn = (board, colIndex) => {
  const col = board.map((row) => row[colIndex]).filter((cell) => cell !== 0);
  const uniqueNumbers = new Set(col);
  return uniqueNumbers.size === col.length;
};

const checkBox = (board, rowIndex, colIndex) => {
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

const checkIncorrectValue = (board, rowIndex, colIndex) => {
  return (
    checkRow(board, rowIndex) &&
    checkColumn(board, colIndex) &&
    checkBox(board, rowIndex, colIndex)
  );
};

export default function SudokuPage() {
  const board = useSelector((state) => state.filter);
  const isValid = useSelector((state) => state.validation.isValid);
  const dispatch = useDispatch();
  const [isGameStarted, setIsGameStarted] = useState(false);

  const handleInput = (e, rowIndex, colIndex) => {
    const value = e.target.value === "" ? 0 : parseInt(e.target.value, 10);
    if (isNaN(value) || value < 0 || value > 9) return;
    const updatedBoard = board.map((row, rIdx) =>
      row.map((cell, cIdx) =>
        rIdx === rowIndex && cIdx === colIndex ? value : cell
      )
    );
    const isValidCell = checkIncorrectValue(updatedBoard, rowIndex, colIndex);
    dispatch(updateBoard({ rowIndex, colIndex, value }));
    dispatch(setValidationStatus(isValidCell));
    if (value === 0) {
      e.target.style.backgroundColor = "";
    } else if (!isValidCell) {
      e.target.style.backgroundColor = "red";
    } else {
      e.target.style.backgroundColor = "";
    }
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-2xl font-bold mb-4">Sudoku Game</h1>
      {isGameStarted ? (
        <div>
          <Timer />
          <Board handleInput={handleInput} board={board} />
          <Buttons />
          <div className="mt-4">
            <span
              className={`text-xl font-bold ${
                isValid ? "text-green-500" : "text-red-500"
              }`}
            >
              {isValid ? "Board is Valid!" : "Board is Invalid!"}
            </span>
          </div>
        </div>
      ) : (
        <button onClick={() => setIsGameStarted(true)}>Start Game</button>
      )}
      <Timer />
    </div>
  );
}

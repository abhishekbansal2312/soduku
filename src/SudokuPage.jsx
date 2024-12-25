import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateBoard,
  countNumbers,
  addSteps,
  undoStep,
  resetGame,
} from "./slices/filterSlice";
import Board from "./components/Board";
import Buttons from "./components/Buttons";
import StartGame from "./components/StartGame";
import BackgroundChanger from "./components/BackgroundChanger";
import Timer from "./components/Timer";

export default function SudokuPage() {
  const { validation, gameStarted } = useSelector((state) => state.filter);
  const color = useSelector((state) => state.style.theme);
  const counts = useSelector(countNumbers);
  const dispatch = useDispatch();

  const handleInput = (e, rowIndex, colIndex) => {
    const value = e.target.value === "" ? 0 : parseInt(e.target.value);

    Object.entries(counts).map(([number, count]) => {
      if (number == value && count >= 9) {
        return alert("You can't add more than 9 numbers");
      }
    });

    if (isNaN(value) || value < 0 || value > 9) return;
    dispatch(updateBoard({ rowIndex, colIndex, value }));
    dispatch(
      addSteps({ rowIndex: rowIndex, colIndex: colIndex, value: value })
    );
  };

  return (
    <div
      className="w-screen h-screen bg-gray-100 flex justify-center items-center"
      style={{ backgroundColor: color }}
    >
      {gameStarted ? (
        <div
          className="flex flex-col md:flex-row justify-between w-full max-w-4xl p-6 bg-white rounded-lg"
          style={{ backgroundColor: color }}
        >
          <div className="flex flex-col justify-center items-center mb-6 md:mb-0">
            <button
              className="px-6 py-3 bg-blue-500 text-white text-xl font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all duration-300"
              onClick={() => dispatch(undoStep())}
            >
              Undo
            </button>
          </div>

          <div className="flex-1 text-center">
            <h1 className="text-4xl font-bold mt-10 mb-4">Sudoku</h1>
            <div className="sudoku-board flex items-center justify-center flex-col mb-10">
              <Timer />
              <Board handleInput={handleInput} validation={validation} />
              <Buttons />
            </div>
          </div>

          <div className="flex justify-center items-center">
            <BackgroundChanger />
          </div>
        </div>
      ) : (
        <StartGame />
      )}
    </div>
  );
}

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateBoard, countNumbers, startGame } from "./slices/filterSlice";
import Board from "./components/Board";
import Buttons from "./components/Buttons";
import StartGame from "./components/StartGame";
import BackgroundChanger from "./components/BackgroundChanger";
import Timer from "./components/Timer";

export default function SudokuPage() {
  const validation = useSelector((state) => state.filter.validation);
  const isValid = useSelector((state) => state.filter.isBoardValid);
  const isGameStared = useSelector((state) => state.filter.gameStarted);
  const color = useSelector((state) => state.style.theme);
  const counts = useSelector(countNumbers);
  const dispatch = useDispatch();

  const handleInput = (e, rowIndex, colIndex) => {
    const value = e.target.value === "" ? 0 : parseInt(e.target.value, 10);

    Object.entries(counts).map(([number, count]) => {
      if (number == value && count >= 9) {
        return alert("You can't add more than 9 numbers");
      }
    });

    if (isNaN(value) || value < 0 || value > 9) return;
    dispatch(updateBoard({ rowIndex, colIndex, value }));
  };
  console.log(color);

  return (
    <div className="w-screen h-screen">
      {isGameStared ? (
        <div
          className="flex flex-row justify-between "
          style={{ backgroundColor: color }}
        >
          <div></div>
          <div>
            <h1 className="text-4xl font-bold text-center mt-8">Sudoku</h1>
            <div className="sudoku-board flex items-center justify-center mt-4 flex-col">
              <Timer />
              <Board handleInput={handleInput} validation={validation} />
              <Buttons />
            </div>

            <div className="mt-4 flex justify-center text-center">
              <span
                className={`text-xl font-bold ${
                  isValid ? "text-green-500" : "text-red-500"
                }`}
              >
                {isValid ? "Board is Valid!" : "Board is Invalid!"}
              </span>
            </div>
          </div>
          <div>
            <BackgroundChanger />
          </div>
        </div>
      ) : (
        <StartGame />
      )}
    </div>
  );
}

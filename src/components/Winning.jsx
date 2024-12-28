import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { resetGame } from "../slices/filterSlice";
import { resetTimer } from "../slices/timerSlice";
import { selectTimer } from "../slices/timerSlice";

export default function Winning() {
  const dispatch = useDispatch();
  const time = useSelector((state) => state.timer.time);
  const { formattedHours, formattedMinutes, formattedSeconds } =
    useSelector(selectTimer);
  const color = useSelector((state) => state.style.theme);
  return (
    <div>
      <div
        className="absolute inset-0 bg-white bg-opacity-90 flex justify-center items-center z-10"
        style={{ backgroundColor: color }}
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold">Congratulations!</h1>
          <p className="text-2xl font-semibold mt-4">
            You've completed the Sudoku!
          </p>
          <button
            className="mt-6 px-6 py-3 bg-blue-500 text-white text-xl font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all duration-300"
            onClick={() => {
              dispatch(resetGame());
              dispatch(resetTimer());
            }}
          >
            Play Again
          </button>
          {time > 20 && (
            <div>
              <p className="text-2xl font-semibold mt-6">Time taken:</p>
              <p className="text-3xl font-bold">
                <span>
                  {formattedHours > 0 && <span>{formattedHours}:</span>}
                  {formattedMinutes}:{formattedSeconds}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

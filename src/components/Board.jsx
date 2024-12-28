import React from "react";
import { useSelector } from "react-redux";

export default function Board({ handleInput, validation }) {
  const board = useSelector((state) => state.filter.board);
  const isEditable = useSelector((state) => state.filter.isEditable);

  const isGraySection = (rowIndex, colIndex) => {
    return (Math.floor(rowIndex / 3) + Math.floor(colIndex / 3)) % 2 === 1;
  };

  return (
    <div>
      <div className="grid grid-cols-9 border-2 border-black">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <input
              key={`${rowIndex}${colIndex}`}
              value={cell || ""}
              max={9}
              min={1}
              onChange={(e) => handleInput(e, rowIndex, colIndex)}
              disabled={!isEditable[rowIndex][colIndex]} // Use isEditable here
              className={`w-12 h-12 text-center border border-stone-950 border-collapse 
              ${rowIndex % 3 === 0 && rowIndex !== 0 ? "border-t-2" : ""} 
              ${colIndex % 3 === 0 && colIndex !== 0 ? "border-l-2" : ""} 
              ${
                isGraySection(rowIndex, colIndex)
                  ? validation[rowIndex][colIndex]
                    ? "bg-gray-400"
                    : "bg-red-300"
                  : cell === 0
                  ? ""
                  : validation[rowIndex][colIndex]
                  ? "bg-white"
                  : "bg-red-300"
              }
              `}
            />
          ))
        )}
      </div>
    </div>
  );
}

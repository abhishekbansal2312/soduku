import React from "react";

export default function Board({ handleInput, board }) {
  return (
    <div>
      <div className="grid grid-cols-9 gap-0.5 border-4 border-black">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <input
              key={`${rowIndex}${colIndex}`}
              value={cell || ""}
              max={9}
              min={1}
              onChange={(e) => handleInput(e, rowIndex, colIndex)}
              className="w-12 h-12 text-center border"
            />
          ))
        )}
      </div>
    </div>
  );
}

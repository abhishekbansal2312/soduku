import React from "react";
import { startGame } from "../slices/filterSlice";
import { useDispatch } from "react-redux";
export default function StartGame() {
  const dispatch = useDispatch();
  return (
    <div>
      <div>
        <button
          className=" justify-center items-center h-screen w-screen text-4xl font-bold text-center"
          onClick={() => dispatch(startGame(true))}
        >
          Start Game
        </button>
      </div>
    </div>
  );
}

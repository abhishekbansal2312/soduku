import React from "react";
import { useDispatch } from "react-redux";
import { toggleTheme, colors } from "../slices/styleSlice";
export default function BackgroundChanger() {
  const dispatch = useDispatch();
  return (
    <div className="background-changer flex flex-col gap-1 mr-6 mt-10">
      {colors.map((color) => (
        <button
          key={color}
          className={`p-4 cursor-pointer rounder rounded-full border border-slate-950`}
          style={{ backgroundColor: color }}
          onClick={() => dispatch(toggleTheme(color))}
        ></button>
      ))}
    </div>
  );
}

import React from "react";
import { countNumbers } from "../slices/filterSlice";
import { useSelector } from "react-redux";

export default function Buttons() {
  const counts = useSelector(countNumbers);

  return (
    <div>
      <div className="flex justify-center mt-4 gap-4">
        {Object.entries(counts).map(([number, count]) => {
          if (9 - count > 0) {
            return (
              <button key={number} className="relative">
                {count > 0 && (
                  <span className="absolute bottom-6 left-6 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {9 - count}
                  </span>
                )}
                <div className="border bg-yellow-50 border-slate-950 rounded-full gap-4 p-2 flex items-center justify-center w-10 h-10">
                  {number}
                </div>
              </button>
            );
          }
          return null; // Ensure you return null when the condition is not met
        })}
      </div>
    </div>
  );
}

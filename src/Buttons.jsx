import React from "react";
import { countNumbers } from "./slices/filterSlice";
import { useSelector } from "react-redux";

export default function Buttons() {
  const counts = useSelector(countNumbers);

  return (
    <div>
      <div className="flex justify-center mt-4 gap-4">
        {Object.entries(counts).map(([number, count]) => (
          <button key={number} className="gap-4 p-2 border border-slate-950">
            {`${number} ${count}`}
          </button>
        ))}
      </div>
    </div>
  );
}

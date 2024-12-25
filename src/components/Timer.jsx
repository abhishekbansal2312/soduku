import React, { useState, useEffect } from "react";
import pause from "../assets/pause.png";
import resume from "../assets/resume.png";
import reset from "../assets/reset.png";
import { useDispatch } from "react-redux";
import { resetGame } from "../slices/filterSlice";
export default function Timer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const dispatch = useDispatch();
  let interval;

  useEffect(() => {
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimerAndGame = () => {
    setTime(0);
    setIsRunning(false);
    dispatch(resetGame());
  };

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return (
    <div className=" flex justify-between gap-28 items-center">
      <button
        onClick={resetTimerAndGame}
        className="h-14 w-14 text-white p-2 rounded-lg"
      >
        <img src={reset} alt="" srcset="" />
      </button>

      <div className="text-xl font-bold">
        {formattedHours}:{formattedMinutes}:{formattedSeconds}
      </div>

      <div className="">
        {!isRunning ? (
          <button
            onClick={startTimer}
            className=" h-14 w-14 text-white p-2 rounded-lg"
          >
            <img src={resume} alt="" srcset="" />
          </button>
        ) : (
          <button
            onClick={stopTimer}
            className=" h-14 w-14 text-white p-2 rounded-lg"
          >
            <img src={pause} alt="" srcset="" />
          </button>
        )}
      </div>
    </div>
  );
}

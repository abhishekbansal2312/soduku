import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  startTimer,
  stopTimer,
  resetTimer,
  incrementTime,
} from "../slices/timerSlice";
import pause from "../assets/pause.png";
import resume from "../assets/resume.png";
import reset from "../assets/reset.png";
import { resetGame } from "../slices/filterSlice";

const ResetButton = () => {
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => {
        dispatch(resetTimer());
        // dispatch(resetGame());
      }}
      className="h-14 w-14 text-white p-2 rounded-lg"
    >
      <img src={reset} alt="" />
    </button>
  );
};

const ShowTimer = () => {
  const dispatch = useDispatch();
  const { time } = useSelector((state) => state.timer);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(incrementTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");
  return (
    <div className="text-xl font-bold">
      {formattedHours > 0 && formattedHours`${":"}`}
      {formattedMinutes}:{formattedSeconds}
    </div>
  );
};
const PauseButton = () => {
  const dispatch = useDispatch();
  const { isRunning } = useSelector((state) => state.timer);
  return (
    <div>
      {!isRunning ? (
        <button
          onClick={() => dispatch(startTimer())}
          className=" h-14 w-14 text-white p-2 rounded-lg"
        >
          <img src={resume} alt="" />
        </button>
      ) : (
        <button
          onClick={() => dispatch(stopTimer())}
          className=" h-14 w-14 text-white p-2 rounded-lg"
        >
          <img src={pause} alt="" />
        </button>
      )}
    </div>
  );
};

export default function Timer() {
  const dispatch = useDispatch();

  return (
    <div className=" flex justify-between gap-28 items-center">
      <ResetButton />
      <ShowTimer />
      <PauseButton />
    </div>
  );
}

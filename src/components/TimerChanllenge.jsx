import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

// let timer; will be shared across comp and will be overwritten if another timer is started at the same time

const TimerChallenge = ({ title, targetTime }) => {
  const timer = useRef(); // unlike variables it will not be reset or lost
  const dialogRef = useRef(); // for forwarding to ResultModal and reaching dialog in there
  const [timerExpired, setTimerExpired] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);

  const handleStart = () => {
    setTimerRunning(true);
    timer.current = setTimeout(() => {
      setTimerExpired(true);
      setTimerRunning(false);
      dialogRef.current.open(); // refering to exposed .open() method in ResultModal
    }, targetTime * 1000);
  };

  const handleStop = () => {
    setTimerRunning(false);
    clearTimeout(timer.current);
  };

  return (
    <>
      <ResultModal ref={dialogRef} result="lost" targetTime={targetTime} />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerRunning ? handleStop : handleStart}>
            {timerRunning ? "Stop" : "Start"} Challange
          </button>
        </p>
        <p className={timerRunning ? "active" : undefined}>
          {timerRunning ? "Time is running" : "Timer inactive"}
        </p>
      </section>
    </>
  );
};

export default TimerChallenge;

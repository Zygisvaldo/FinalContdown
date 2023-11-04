import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

// let timer; will be shared across comp and will be overwritten if another timer is started at the same time

const TimerChallenge = ({ title, targetTime }) => {
  const timer = useRef(); // unlike variables it will not be reset or lost
  const dialogRef = useRef(); // for forwarding to ResultModal and reaching dialog in there
  /*   const [timerExpired, setTimerExpired] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false); */

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

  const timerActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    dialogRef.current.open();
  }

  const handleReset = () => {
    setTimeRemaining(targetTime * 1000);
  };

  const handleStart = () => {
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);
  };

  /*   const handleStart = () => {
    setTimerRunning(true);
    timer.current = setTimeout(() => {
      setTimerExpired(true);
      setTimerRunning(false);
      dialogRef.current.open(); // refering to exposed .open() method in ResultModal
    }, targetTime * 1000);
  }; */

  const handleStop = () => {
    dialogRef.current.open();
    clearInterval(timer.current);
  };

  return (
    <>
      <ResultModal
        ref={dialogRef}
        remainingTime={timeRemaining}
        targetTime={targetTime}
        onReset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerActive ? handleStop : handleStart}>
            {timerActive ? "Stop" : "Start"} Challange
          </button>
        </p>
        <p className={timerActive ? "active" : undefined}>
          {timerActive ? "Time is running" : "Timer inactive"}
        </p>
      </section>
    </>
  );
};

export default TimerChallenge;

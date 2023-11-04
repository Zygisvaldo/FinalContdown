import { forwardRef, useImperativeHandle, useRef } from "react";

const ResultModal = forwardRef(
  ({ remainingTime, targetTime, onReset }, ref) => {
    const dialog = useRef();

    const userLost = remainingTime <= 0;
    const formatedTimeRemaining = (remainingTime / 1000).toFixed(2);
    // useImperitiveHandle(ref, function that returns an object with groped properties and methods) exposes functions and properties that can be accessed from outside this comp. Is ment to work together with forwardRef.

    // incoming REF will refure to this obeject returened in useImpHndl. So incoming REF is connected to imperitiveHandle
    useImperativeHandle(ref, () => {
      // this is the object that is stored in dialogRef in TimerChallenge comp
      return {
        open() {
          dialog.current.showModal();
        },
      };
    });

    return (
      <dialog ref={dialog} className="result-modal">
        {userLost && <h2>You lost</h2>}
        <p>
          The target time was <strong>{targetTime} seconds.</strong>
        </p>
        <p>
          You stop the timer with{" "}
          <strong>{formatedTimeRemaining} seconds left.</strong>
        </p>
        {/* in a form with a method="dialog" the button that submits the form will automaticaly close the dialog */}
        <form method="dialog" onSubmit={onReset}>
          <button>Close</button>
        </form>
      </dialog>
    );
  }
);

export default ResultModal;

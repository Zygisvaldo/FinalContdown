import { forwardRef } from "react";

const ResultModal = forwardRef(({ result, targetTime }, ref) => {
  return (
    <dialog ref={ref} className="result-modal">
      <h2>You {result}</h2>
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stop the timer with <strong>X seconds left.</strong>
      </p>
      {/* in a form with a method="dialog" the button that submits the form will automaticaly close the dialog */}
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
});

export default ResultModal;

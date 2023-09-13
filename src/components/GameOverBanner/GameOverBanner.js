import React, { useEffect, useMemo, useRef } from "react";
import { GAME_OVER_RESULT } from "../../constants";

function GameOverBanner({ isVisible = false, result, answer, guessCount, onGameRestart }) {
  const restartButtonRef = useRef(null);

  const latestState = useMemo(
    () => ({
      result,
      answer,
      guessCount,
    }),
    [result, answer, guessCount]
  );

  const persistedState = useRef(latestState);
  const internalState = isVisible ? latestState : persistedState.current;

  useEffect(() => {
    if (isVisible) {
      restartButtonRef.current.focus();
      persistedState.current = latestState;
    }
  }, [isVisible, latestState]);

  return (
    <div className={`banner ${[internalState.result]}`} data-visible={String(isVisible)}>
      {internalState.result === GAME_OVER_RESULT.WIN && (
        <p>
          <strong>Congratulations!</strong> Got it in
          <strong>
            {" "}
            {internalState.guessCount} {internalState.guessCount > 1 ? "guesses" : "guess"}.
          </strong>
        </p>
      )}
      {internalState.result === GAME_OVER_RESULT.LOSE && (
        <p>
          Sorry, the correct answer is <strong>{internalState.answer}</strong>.
        </p>
      )}
      <button className="restart-button" ref={restartButtonRef} onClick={onGameRestart}>
        RESTART
      </button>
    </div>
  );
}

export default GameOverBanner;

import React, { useMemo, useState } from "react";
import { GAME_KEYBOARD_LAYOUT, LETTER_STATUS_ORDER } from "../../constants";

function GameKeyboard({
  disabled,
  guessStatus,
  isEnterDisabled,
  isDeleteDisabled,
  onKeyPressed,
  onEnterPressed,
  onDeletePressed,
}) {
  const [pressingKey, setPressingKey] = useState(null);

  const keyStatusRecord = useMemo(() => {
    const sortedStatus = guessStatus.flat().sort((left, right) => {
      const leftStatusOrder = LETTER_STATUS_ORDER.findIndex((letter) => letter === left.status);
      const rightStatusOrder = LETTER_STATUS_ORDER.findIndex((letter) => letter === right.status);

      return leftStatusOrder - rightStatusOrder;
    });

    return sortedStatus.reduce((record, { letter, status }) => {
      return {
        ...record,
        [letter]: status,
      };
    }, {});
  }, [guessStatus]);

  const unpressKey = () => {
    setPressingKey(null);
  };

  const pressKey = (key) => () => {
    if (!disabled) {
      setPressingKey(key);
    }
  };

  const registerKey = () => {
    unpressKey();

    if (disabled) {
      return;
    }

    if (pressingKey === "Enter") {
      onEnterPressed();
      return;
    }

    if (pressingKey === "Delete") {
      onDeletePressed();
      return;
    }

    if (pressingKey) {
      onKeyPressed(pressingKey);
    }
  };

  const renderKey = (key) => {
    if (key === "Enter") {
      return (
        <button
          key={key}
          tabIndex="-1"
          className="keyboard-key action-key"
          disabled={disabled || isEnterDisabled}
          data-pressing={key === pressingKey}
          onMouseDown={pressKey(key)}
          onMouseLeave={unpressKey}
          onMouseUp={registerKey}
        >
          {key}
        </button>
      );
    }

    if (key === "Delete") {
      return (
        <button
          key={key}
          tabIndex="-1"
          className="keyboard-key action-key"
          disabled={disabled || isDeleteDisabled}
          data-pressing={key === pressingKey}
          onMouseDown={pressKey(key)}
          onMouseLeave={unpressKey}
          onMouseUp={registerKey}
        >
          {key}
        </button>
      );
    }

    return (
      <button
        key={key}
        tabIndex="-1"
        disabled={disabled}
        className={`keyboard-key ${keyStatusRecord[key]}`}
        data-pressing={key === pressingKey}
        onMouseDown={pressKey(key)}
        onMouseLeave={unpressKey}
        onMouseUp={registerKey}
      >
        {key}
      </button>
    );
  };

  return (
    <div className="game-keyboard">
      {GAME_KEYBOARD_LAYOUT.map((row, index) => (
        <div key={index} className="keyboard-row">
          {row.map((key) => renderKey(key))}
        </div>
      ))}
    </div>
  );
}

export default GameKeyboard;

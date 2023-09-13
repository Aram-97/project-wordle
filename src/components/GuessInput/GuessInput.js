import React, { useEffect, useRef, useState } from "react";
import { GUESS_CHARACTER_LENGTH } from "../../constants";

function GuessInput({ disabled, onGuessSubmit }) {
  const [guess, setGuess] = useState("");
  const inputRef = useRef();

  const handleInputSubmit = (event) => {
    event.preventDefault();
    onGuessSubmit(guess);
    setGuess("");
  };

  const handleInputChange = (event) => {
    const value = event.target.value.trim().toUpperCase();
    setGuess(value);
  };

  useEffect(() => {
    if (!disabled) {
      inputRef.current.focus();
    }
  }, [disabled]);

  return (
    <form className="guess-input-wrapper" onSubmit={handleInputSubmit}>
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        required
        type="text"
        id="guess-input"
        autoComplete="off"
        pattern={`[a-zA-Z]{${GUESS_CHARACTER_LENGTH}}`}
        title={`Guess should have exactly ${GUESS_CHARACTER_LENGTH} characters`}
        onChange={handleInputChange}
        disabled={disabled}
        ref={inputRef}
        value={guess}
      />
    </form>
  );
}

export default GuessInput;

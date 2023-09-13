import React from "react";
import { range } from "../../utils";
import { GUESS_CHARACTER_LENGTH } from "../../constants";

function GuessRow({ isNextGuess, tempGuess, letterStatus }) {
  return (
    <p className="guess">
      {range(GUESS_CHARACTER_LENGTH).map((index) => (
        <span key={index} className={`cell ${letterStatus?.[index]?.status ?? ""}`}>
          {isNextGuess ? tempGuess?.[index] : letterStatus?.[index]?.letter ?? ''}
        </span>
      ))}
    </p>
  );
}

export default GuessRow;

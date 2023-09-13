import React from "react";
import GuessRow from "../GuessRow/GuessRow";
import { range } from "../../utils";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";

function GuessResults({ tempGuess, guessStatus }) {
  return (
    <div className="guess-results">
      {range(NUM_OF_GUESSES_ALLOWED).map((index) => (
        <GuessRow
          key={index}
          tempGuess={tempGuess}
          letterStatus={guessStatus?.[index]}
          isNextGuess={index === guessStatus.length}
        />
      ))}
    </div>
  );
}

export default GuessResults;

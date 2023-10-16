import React, { useEffect, useMemo, useState } from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";
import GuessInput from "../GuessInput/GuessInput";
import GuessResults from "../GuessResults/GuessResults";
import GameOverBanner from "../GameOverBanner/GameOverBanner";
import { GAME_OVER_RESULT, GUESS_CHARACTER_LENGTH, NUM_OF_GUESSES_ALLOWED } from "../../constants";
import GameKeyboard from "../GameKeyboard/GameKeyboard";
import { checkGuess } from "../../game-helpers";

// Pick a random word on every pageload.
// const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
// console.info({ answer });

function Game() {
  const [answer, setAnswer] = useState(() => sample(WORDS));
  const [guessResults, setGuessResults] = useState([]);
  const [gameResult, setGameResult] = useState(null);
  const [tempGuess, setTempGuess] = useState("");

  console.info({ answer });

  const isDeleteDisabled = !tempGuess.length;
  const isEnterDisabled = tempGuess.length < GUESS_CHARACTER_LENGTH;

  const guessStatus = useMemo(
    () => guessResults.map((guess) => checkGuess(guess, answer)),
    [answer, guessResults]
  );

  const handleGameRestart = () => {
    setAnswer(sample(WORDS));
    setGuessResults([]);
    setGameResult(null);
  };

  const handleGuessSubmit = (guess) => {
    setGuessResults([...guessResults, guess]);

    if (tempGuess) {
      setTempGuess("");
    }
  };

  const handleKeyPressed = (key) => {
    if (tempGuess.length < GUESS_CHARACTER_LENGTH) {
      setTempGuess(tempGuess.concat(key));
    }
  };

  const handleEnterPressed = () => {
    if (!isEnterDisabled) {
      setGuessResults([...guessResults, tempGuess]);
      setTempGuess("");
    }
  };

  const handleDeletePressed = () => {
    if (!isDeleteDisabled) {
      setTempGuess(tempGuess.slice(0, tempGuess.length - 1));
    }
  };

  useEffect(() => {
    const lastGuess = guessResults.at(-1);
    const isGuessCorrect = lastGuess === answer;
    const isOutOfGuess = guessResults.length >= NUM_OF_GUESSES_ALLOWED;

    if (isGuessCorrect) {
      setGameResult(GAME_OVER_RESULT.WIN);
    } else if (isOutOfGuess) {
      setGameResult(GAME_OVER_RESULT.LOSE);
    }
  }, [answer, guessResults]);

  return (
    <div className="wrapper">
      <GuessResults tempGuess={tempGuess} guessStatus={guessStatus} />
      <GuessInput disabled={!!gameResult} onGuessSubmit={handleGuessSubmit} />
      <GameKeyboard
        disabled={!!gameResult}
        guessStatus={guessStatus}
        isEnterDisabled={isEnterDisabled}
        isDeleteDisabled={isDeleteDisabled}
        onDeletePressed={handleDeletePressed}
        onEnterPressed={handleEnterPressed}
        onKeyPressed={handleKeyPressed}
      />
      <GameOverBanner
        answer={answer}
        result={gameResult}
        isVisible={!!gameResult}
        guessCount={guessResults.length}
        onGameRestart={handleGameRestart}
      />
    </div>
  );
}

export default Game;

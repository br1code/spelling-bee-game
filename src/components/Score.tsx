import { FC } from 'react';

interface ScoreProps {
  correctGuesses: string[];
  validLetters: string[];
}

const GUESS_MIN_LENGTH = 4;
const GUESS_PANGRAM_EXTRA_POINTS = 7;

const Score: FC<ScoreProps> = ({ correctGuesses, validLetters }) => {
  let score = 0;

  const isPangram = (guess: string): boolean => {
    const guessLower = guess.toLowerCase();

    for (const letter of validLetters) {
      if (!guessLower.includes(letter)) {
        return false;
      }
    }
    return true;
  };

  for (const guess of correctGuesses) {
    if (guess.length === GUESS_MIN_LENGTH) {
      score++;
    } else if (isPangram(guess)) {
      score += guess.length + GUESS_PANGRAM_EXTRA_POINTS;
    } else {
      score += guess.length;
    }
  }

  return <p className="score">Score: {score}</p>;
};

export default Score;

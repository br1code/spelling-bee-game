import { FC } from 'react';

interface ScoreProps {
  correctGuesses: string[];
}

const GUESS_MIN_LENGTH = 4;

const Score: FC<ScoreProps> = ({ correctGuesses }) => {
  let score = 0;

  for (const guess of correctGuesses) {
    if (guess.length === GUESS_MIN_LENGTH) {
      score++;
    } else {
      score += guess.length;
    }
  }

  return <p className="score">Score: {score}</p>;
};

export default Score;

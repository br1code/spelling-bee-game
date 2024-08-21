import { FC } from 'react';

interface GuessProps {
  guess: string;
  centerLetter: string;
}

const Guess: FC<GuessProps> = ({ guess, centerLetter }) => {
  const formattedGuess = guess.split('').map((letter, index) => {
    const className = letter === centerLetter ? 'guess-center' : 'guess-outer';
    return (
      <b key={index} className={className}>
        {letter}
      </b>
    );
  });
  return (
    <section className="guess">
      <p className="guess-letters">{formattedGuess}</p>
    </section>
  );
};

export default Guess;

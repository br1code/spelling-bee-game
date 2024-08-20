import { FC } from 'react';

interface GuessProps {
  guess: string;
}

const Guess: FC<GuessProps> = ({ guess }) => {
  return (
    <section className="guess">
      <p className="guess-letters">{guess}</p>
    </section>
  );
};

export default Guess;

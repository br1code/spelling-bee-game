import { FC, useState } from 'react';
import Letter from './Letter';

interface HoneycombProps {
  centerLetter: string;
  outerLetters: string[];
  validLetters: string[];
  addLetter: (letter: string) => void;
  removeLetter: () => void;
  checkGuess: () => void;
}

const Honeycomb: FC<HoneycombProps> = ({
  centerLetter,
  outerLetters,
  validLetters,
  addLetter,
  removeLetter,
  checkGuess,
}) => {
  const [randomOuterLetters, setRandomOuterLetters] =
    useState<string[]>(outerLetters);

  const onShuffleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    const randomizedLetters = [...randomOuterLetters].sort(
      () => Math.random() - 0.5
    );
    setRandomOuterLetters(randomizedLetters);
  };

  const generateRandomKey = (letter: string, index: number): string => {
    return `${letter}_${index}_${Math.random()}`;
  };

  return (
    <>
      <article className="honeycomb">
        <Letter letter={centerLetter} isCenter={true} addLetter={addLetter} />
        {randomOuterLetters.map((letter, index) => (
          <Letter
            letter={letter}
            isCenter={false}
            key={generateRandomKey(letter, index)}
            addLetter={addLetter}
          />
        ))}
      </article>
      <section className="buttons">
        <button className="button" onClick={removeLetter}>
          Delete
        </button>
        <button className="button" onClick={onShuffleClick}>
          Shuffle
        </button>
        <button className="button" onClick={checkGuess}>
          Guess
        </button>
      </section>
    </>
  );
};

export default Honeycomb;

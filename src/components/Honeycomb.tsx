import { FC } from 'react';
import Letter from './Letter';

interface HoneycombProps {
  centerLetter: string;
  outerLetters: string[];
  validLetters: string[];
}

const Honeycomb: FC<HoneycombProps> = ({
  centerLetter,
  outerLetters,
  validLetters,
}) => {
  return (
    <article className="honeycomb">
      <Letter letter={centerLetter} isCenter={true} />
      {outerLetters.map((letter, index) => (
        <Letter letter={letter} isCenter={false} key={index} />
      ))}
    </article>
  );
};

export default Honeycomb;

import { FC, useState } from 'react';

interface CorrectGuessesProp {
  correctGuesses: string[];
}

const CorrectGuesses: FC<CorrectGuessesProp> = ({ correctGuesses }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openGuesses = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const closeGuesses = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    setIsOpen(false);
  };

  return (
    <section className="correctGuesses">
      {isOpen ? (
        <ul>
          {correctGuesses.map((guess: string) => (
            <li key={guess}>{guess}</li>
          ))}
        </ul>
      ) : (
        <p>{correctGuesses.length} words found.</p>
      )}
      {isOpen ? (
        <a className="openClose" href="#" onClick={closeGuesses}>
          Close
        </a>
      ) : correctGuesses.length > 0 ? (
        <a className="openClose" href="#" onClick={openGuesses}>
          Open
        </a>
      ) : null}
    </section>
  );
};

export default CorrectGuesses;

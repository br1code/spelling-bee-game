import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Honeycomb from './components/Honeycomb';
import Guess from './components/Guess';
import CorrectGuesses from './components/CorrectGuesses';
import Score from './components/Score';

interface ApiData {
  displayDate: string;
  editor: string;
  answers: string[];
  centerLetter: string;
  outerLetters: string[];
  validLetters: string[];
}

const GUESS_MIN_LENGTH = 4;
const CORRECT_GUESSES_LOCAL_STORAGE_KEY = 'correctGuesses';

function App() {
  const [data, setData] = useState<ApiData>();
  const [guess, setGuess] = useState<string>('');
  const [correctGuesses, setCorrectGuesses] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/data.json', {
          headers: { 'Content-Type': 'application/json' },
        });

        const json = await response.json();
        setData(json.data.today);
      } catch (error) {
        console.error('Failed to fetch data' + error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const storedCorrectGuessesValue = localStorage.getItem(
      CORRECT_GUESSES_LOCAL_STORAGE_KEY
    );

    if (storedCorrectGuessesValue) {
      const storedCorrectGuesses = JSON.parse(
        storedCorrectGuessesValue
      ) as string[];

      if (storedCorrectGuesses?.length > 0) {
        setCorrectGuesses(storedCorrectGuesses);
      }
    }
  }, []);

  const addLetter = (letter: string) => {
    setGuess((g) => g + letter);
  };

  const removeLetter = () => {
    setGuess(guess.slice(0, -1));
  };

  const checkGuess = () => {
    if (!guess || !data) return;

    const guessWasAlreadyFound = correctGuesses.includes(guess);
    const guessHasValidLength = guess.length >= GUESS_MIN_LENGTH;
    const guessHasCenterLetter = guess.includes(data.centerLetter);
    const guessIsValidAnswer = data.answers.includes(guess);
    const isCorrectGuess =
      guessHasValidLength && guessHasCenterLetter && guessIsValidAnswer;

    if (guessWasAlreadyFound) {
      alert('Already found!');
    } else if (isCorrectGuess) {
      addCorrectGuess();
      alert('Good job!');
    } else {
      if (!guessHasValidLength) {
        alert('Your guess must have at least 4 letters.');
      } else if (!guessHasCenterLetter) {
        alert('Your guess must contain the center letter.');
      } else if (!guessIsValidAnswer) {
        alert('Nope!');
      }
    }

    setGuess('');
  };

  const addCorrectGuess = () => {
    const guesses = [...correctGuesses, guess];
    setCorrectGuesses(guesses);

    const guessesValue = JSON.stringify(guesses);
    localStorage.setItem(CORRECT_GUESSES_LOCAL_STORAGE_KEY, guessesValue);
  };

  return (
    <>
      {data ? (
        <>
          <Header date={data.displayDate} editor={data.editor} />
          <Score
            correctGuesses={correctGuesses}
            validLetters={data.validLetters}
          />
          <CorrectGuesses correctGuesses={correctGuesses} />
          <section className="container">
            <div className="inputs">
              <div className="center">
                <Guess guess={guess} centerLetter={data.centerLetter} />
                <Honeycomb
                  centerLetter={data.centerLetter}
                  outerLetters={data.outerLetters}
                  addLetter={addLetter}
                  removeLetter={removeLetter}
                  checkGuess={checkGuess}
                />
              </div>
            </div>
          </section>
        </>
      ) : (
        <p>Loading ...</p>
      )}
    </>
  );
}

export default App;

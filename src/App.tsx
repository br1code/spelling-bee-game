import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Honeycomb from './components/Honeycomb';
import Guess from './components/Guess';

interface ApiData {
  displayDate: string;
  editor: string;
  answers: string[];
  centerLetter: string;
  outerLetters: string[];
  validLetters: string[];
}

function App() {
  const [data, setData] = useState<ApiData>();
  const [guess, setGuess] = useState<string>('');

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

  const addLetter = (letter: string) => {
    setGuess((g) => g + letter);
  };

  const removeLetter = () => {
    setGuess(guess.slice(0, -1));
  };

  const checkGuess = () => {
    if (data?.answers.includes(guess)) {
      console.log('Good job!');
    } else {
      console.log('Nope');
    }
  };

  return (
    <>
      {data ? (
        <>
          <Header date={data.displayDate} editor={data.editor} />
          <section className="container">
            <div className="inputs">
              <div className="center">
                <Guess guess={guess} />
                <Honeycomb
                  centerLetter={data.centerLetter}
                  outerLetters={data.outerLetters}
                  validLetters={data.validLetters}
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

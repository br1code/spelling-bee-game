import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Honeycomb from './components/Honeycomb';

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

  return (
    <>
      {data ? (
        <>
          <Header date={data.displayDate} editor={data.editor} />
          <section className="container">
            <div className="inputs">
              <div className="center">
                <Honeycomb
                  centerLetter={data.centerLetter}
                  outerLetters={data.outerLetters}
                  validLetters={data.validLetters}
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

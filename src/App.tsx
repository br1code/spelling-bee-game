import { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/data.json', {
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Failed to fetch data' + error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <h1>My app</h1>
    </>
  );
}

export default App;

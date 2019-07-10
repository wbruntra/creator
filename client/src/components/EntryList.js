import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function App() {
  const [data, setData] = useState({ entries: [] });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('/api/entries');

      console.log(result.data);
      setData(result.data);
    };

    fetchData();
  }, []);

  console.log(data);

  return (
    <div className="body">
      <div className="container">
        <div className="poem-box">
          <h2 className="title">Available Works</h2>
          <ul className="poem-list">
            {data.entries.map((entry, i) => {
              return (
                <li key={`entry-${i}`} className="entry-title">
                  <Link to={`/entries/${entry.id}`}>{entry.title}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="foot right-align">
        <p>Created by William Bruntrager</p>
      </div>
    </div>
  );
}

export default App;

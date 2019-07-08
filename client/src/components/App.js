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
        <div className="row fact-box">
          <div className="col s12">
            <h2 className="title">Available Works</h2>
            <ul>
              {data.entries.map((entry, i) => {
                return (
                  <div key={`entry-${i}`}>
                    <li className="entry-title">
                      <Link to={`/entries/${entry.id}`}>{entry.title}</Link>
                    </li>
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className="foot right-align">
        <p>Created by William Bruntrager</p>
      </div>
    </div>
  );
}

export default App;

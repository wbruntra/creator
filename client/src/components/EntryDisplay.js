import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function EntryDisplay({ match }) {
  const [entry, setEntry] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const entryId = match.params.id;
      const result = await axios(`/api/entries/${entryId}`);
      // const entryBody = result.data.body.replace(/\n/g, '<br />');

      setEntry(result.data);
    };

    fetchData();
  }, []);

  return (
    <div className="body">
      <div className="container">
        <div className="poem-box">
          <h2 className="title">{entry.title}</h2>
          <p style={{ whiteSpace: 'pre' }}>{entry.body}</p>
        </div>
      </div>
      {/* <div className="foot right-align">
        <p>Created by William Bruntrager</p>
      </div> */}
    </div>
  );
}

export default EntryDisplay;

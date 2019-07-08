import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function EntryDisplay({ match }) {
  const styles = {
    margin: '28px auto',
    maxWidth: '760px',
  };

  const [entry, setEntry] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const entryId = match.params.id;
      console.log(entryId);
      const result = await axios(`/api/entries/${entryId}`);
      console.log(result);
      setEntry(result.data);
    };

    fetchData();
  }, []);

  return (
    <div className="body">
      <div style={styles} className="container">
        <div className="row fact-box">
          <div className="col s12">
            <h2 className="title">{entry.title}</h2>
            <p style={{ whiteSpace: 'pre-wrap' }}>{entry.body}</p>
          </div>
        </div>
      </div>
      <div className="foot right-align">
        <p>Created by William Bruntrager</p>
      </div>
    </div>
  );
}

export default EntryDisplay;

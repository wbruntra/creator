import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Footer from './Footer';

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
    <div className="flex vertical full">
      <h2 className="title">{entry.title}</h2>
      <div className="poem-box">
        <p style={{ whiteSpace: 'pre' }}>{entry.body}</p>
      </div>
      {/* <div className="foot right-align">
        <p>Created by William Bruntrager</p>
      </div> */}
      <Footer />
    </div>
  );
}

export default EntryDisplay;

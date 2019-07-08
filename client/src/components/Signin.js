import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function EntryDisplay({ match }) {
  const styles = {
    margin: '28px auto',
    maxWidth: '760px',
  };

  const [url, setUrl] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`/api/google/link`);
      setUrl(result.data.url);
    };

    fetchData();
  }, []);

  return (
    <div className="body">
      <div style={styles} className="container">
        <button>
          <a href={url}>Sign in</a>
        </button>
      </div>
      <div className="foot right-align">
        <p>Created by William Bruntrager</p>
      </div>
    </div>
  );
}

export default EntryDisplay;

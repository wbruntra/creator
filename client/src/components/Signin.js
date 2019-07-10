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
    <div className="composer">
      <div style={{ height: '50vh' }} className="flex vertical flex-child">
        <p className="entry-title center-text flex-child">
          Welcome! To write something, please <a href={url}>sign in</a> with
          your Google account.
        </p>
        <p className="entry-title center-text flex-child">
          Or you can just <Link to="/entries">read</Link> the available works.
        </p>
      </div>

      <div className="foot right-align">
        <p>Created by William Bruntrager</p>
      </div>
    </div>
  );
}

export default EntryDisplay;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { get } from 'micro-dash';
import { connect } from 'react-redux';
import { mapStateToProps } from './redux-helpers';
import Footer from './Footer';

function App({ user }) {
  const [data, setData] = useState({ entries: [] });

  const fetchData = async () => {
    const result = await axios('/api/entries');

    setData(result.data);
  };

  const deleteEntry = async id => {
    if (window.confirm('Delete?')) {
      await axios.delete(`/api/entries/${id}`);
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex vertical full">
      <h2 className="title">Available Works</h2>
      <div className="poem-box">
        <ul className="poem-list">
          {data.entries.map((entry, i) => {
            return (
              <li key={`entry-${i}`} className="entry-title flex">
                <Link to={`/entries/${entry.id}`}>{entry.title}</Link>
                {get(user, ['profile', 'email']) === entry.creator_email && (
                  <div className="push">
                    <Link to={`/compose/${entry.id}`}>
                      <i className="material-icons">edit</i>
                    </Link>
                    <i
                      className="material-icons"
                      onClick={() => {
                        deleteEntry(entry.id);
                      }}
                    >
                      delete
                    </i>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <Footer />
    </div>
  );
}

export default connect(mapStateToProps)(App);

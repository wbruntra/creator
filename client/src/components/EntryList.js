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
    <div className="body">
      <div className="container">
        <div className="poem-box">
          <h2 className="title">Available Works</h2>
          <ul className="poem-list">
            {data.entries.map((entry, i) => {
              return (
                <li key={`entry-${i}`} className="entry-title">
                  <Link to={`/entries/${entry.id}`}>{entry.title}</Link>
                  {get(user, ['profile', 'email']) === entry.creator_email && (
                    <span className="right-box">
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
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default connect(mapStateToProps)(App);

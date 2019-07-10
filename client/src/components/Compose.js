import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { isEmpty } from 'micro-dash';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { mapStateToProps } from './redux-helpers';
import Footer from './Footer';

function TitleEntryForm({ setTitle, draftTitle, setDraftTitle }) {
  return (
    <form
      className="flex flex-child"
      onSubmit={e => {
        e.preventDefault();
        setTitle(draftTitle);
      }}
    >
      <input
        className="entry-title center-text flex-child"
        onChange={e => {
          setDraftTitle(e.target.value);
        }}
        value={draftTitle}
        placeholder="Enter Title Here"
        autoFocus={true}
      />
      <input type="submit" hidden />
    </form>
  );
}

function Compose(props) {
  const [draftTitle, setDraftTitle] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleForm = e => {
    e.preventDefault();
    const { id } = props.match.params;

    if (!isEmpty(id)) {
      axios
        .post('/api/entries/edit', {
          id,
          title,
          body,
        })
        .then(props.history.push('/entries'));
    } else {
      axios
        .post('/api/entries/new', {
          title,
          body,
          email: props.user.profile.email,
        })
        .then(props.history.push('/entries'));
    }

    setTitle('');
    setDraftTitle('');
    setBody('');
  };

  useEffect(() => {
    const { id } = props.match.params;

    const fetchData = async () => {
      const result = await axios(`/api/entries/${id}`);

      const { title, body } = result.data;
      setTitle(title);
      setBody(body);
    };

    if (!isEmpty(id)) {
      fetchData();
    }
  }, [props.match.params]);

  if (!props.user.initialized) {
    return null;
  }

  if (isEmpty(props.user.profile)) {
    props.history.push('/signin');
  }

  return (
    <div className="composer">
      <div
        className={`flex-child flex full vertical ${
          isEmpty(title) ? 'center' : 'stretch'
        }`}
        style={{ flex: 5 }}
      >
        {isEmpty(title) ? (
          <TitleEntryForm
            setTitle={setTitle}
            draftTitle={draftTitle}
            setDraftTitle={setDraftTitle}
          />
        ) : (
          <>
            <h2
              onClick={() => {
                setTitle('');
              }}
              className="flex-child entry-title"
            >
              {title}
            </h2>
            <form
              style={{ justifyContent: 'space-between' }}
              className="flex flex-child"
              onSubmit={handleForm}
            >
              <textarea
                autoFocus={true}
                // placeholder="Start writing..."
                value={body}
                onChange={e => {
                  setBody(e.target.value);
                }}
              />
            </form>
          </>
        )}
      </div>
      {!isEmpty(title) && (
        <div className="sidebar flex-child flex vertical" style={{ flex: 1 }}>
          <div className="flex-child">
            <button
              className="btn btn-white"
              onClick={handleForm}
              type="submit"
            >
              Save
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default connect(mapStateToProps)(Compose);

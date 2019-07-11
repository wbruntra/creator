import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { isEmpty } from 'micro-dash';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { mapStateToProps } from './redux-helpers';
import Footer from './Footer';

export const ButtonHolder = ({ handleForm }) => {
  return (
    <div className="button-holder">
      <button className="btn btn-white" onClick={handleForm} type="submit">
        Save
      </button>
    </div>
  );
};

function TitleEntryForm({ setTitle, draftTitle, setDraftTitle }) {
  return (
    <form
      className="flex vertical"
      onSubmit={e => {
        e.preventDefault();
        setTitle(draftTitle);
      }}
    >
      <div>
        <input
          className="entry-title center-text"
          onChange={e => {
            setDraftTitle(e.target.value);
          }}
          value={draftTitle}
          placeholder="Enter Title Here"
          autoFocus={true}
        />
        <input type="submit" hidden />
      </div>
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

  if (isEmpty(title)) {
    return (
      <div className="composer">
        <form
          onSubmit={e => {
            e.preventDefault();
            setTitle(draftTitle);
          }}
        >
          <input
            style={{ paddingTop: '40%' }}
            className="entry-title center-text"
            onChange={e => {
              setDraftTitle(e.target.value);
            }}
            value={draftTitle}
            placeholder="Enter Title Here"
            autoFocus={true}
          />
          <input type="submit" hidden />
        </form>

        <Footer />
      </div>
    );
  }

  return (
    <div className="composer">
      <h2
        onClick={() => {
          setTitle('');
        }}
        className="entry-title"
      >
        {title}
      </h2>
      <div className="form-holder">
        <form className="flex" onSubmit={handleForm}>
          <textarea
            autoFocus={true}
            // placeholder="Start writing..."
            value={body}
            onChange={e => {
              setBody(e.target.value);
            }}
          />
          {window.innerWidth >= 480 && <ButtonHolder handleForm={handleForm} />}
        </form>
      </div>
      <Footer saveButton={window.innerWidth < 480} handleForm={handleForm} />
    </div>
  );
}

export default connect(mapStateToProps)(Compose);

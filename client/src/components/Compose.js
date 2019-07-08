import React, { useState } from 'react';
import axios from 'axios';
import { isEmpty } from 'micro-dash';

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
    axios
      .post('/api/entries/new', {
        title,
        body,
      })
      .then(props.history.push('/entries'));
    setTitle('');
    setDraftTitle('');
    setBody('');
  };

  // useEffect(() => {
  //   const handleResize = () => {
  //     const textHeight = formEl.current ? formEl.current.offsetHeight : 0;
  //     console.log('Form height', formEl.current.offsetHeight);
  //   };
  //   window.addEventListener('resize', handleResize);
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

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
            <h2 className="flex-child entry-title">{title}</h2>
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
    </div>
  );
}

export default Compose;

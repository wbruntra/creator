import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { mapStateToProps, getUsername } from './redux-helpers';
import { ButtonHolder } from './Compose';

function Footer({ user, saveButton, handleForm }) {
  return (
    <div className="foot flex">
      <p>
        <Link to="/compose">Compose</Link>
      </p>

      <p>
        <Link to="/entries">Entries</Link>
      </p>
      <div className="push">
        {saveButton ? (
          <ButtonHolder handleForm={handleForm} />
        ) : (
          <p className="username">{getUsername(user)}</p>
        )}
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(Footer);

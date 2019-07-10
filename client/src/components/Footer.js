import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { mapStateToProps, getUsername } from './redux-helpers';

function Footer({ user }) {
  return (
    <div className="foot flex">
      <p>
        <Link to="/compose">Compose</Link>
      </p>

      <p>
        <Link to="/entries">Entries</Link>
      </p>
      <div className="push">
        <p className="username">{getUsername(user)}</p>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(Footer);

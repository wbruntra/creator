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
      <p className="username">{getUsername(user)}</p>
    </div>
  );
}

export default connect(mapStateToProps)(Footer);

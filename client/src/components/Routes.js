import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import EntryList from './EntryList';
import Compose from './Compose';
import EntryDisplay from './EntryDisplay';
import Signin from './Signin';
import Landing from './Landing';
import { connect } from 'react-redux';
import { getStatus } from '../actions';
import { mapStateToProps } from './redux-helpers';

function AppRouter({ getStatus }) {
  useEffect(() => {
    getStatus();
  }, [getStatus]);

  return (
    <Router>
      <>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/compose">Compose</Link>
            </li>
            <li>
              <Link to="/entries">See Entries</Link>
            </li>
          </ul>
        </nav> */}

        <Route path="/" exact component={Landing} />
        <Route path="/compose/:id?" exact component={Compose} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/entries" exact component={EntryList} />
        <Route path="/entries/:id" component={EntryDisplay} />
      </>
    </Router>
  );
}

export default connect(
  mapStateToProps,
  { getStatus }
)(AppRouter);

import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Main from './App';
import Compose from './Compose';
import EntryDisplay from './EntryDisplay';

function AppRouter() {
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

        <Route path="/" exact component={Compose} />
        <Route path="/entries" exact component={Main} />
        <Route path="/entries/:id" component={EntryDisplay} />
      </>
    </Router>
  );
}

export default AppRouter;

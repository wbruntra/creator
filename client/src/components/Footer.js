import React from 'react';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="foot flex">
      <p>
        <Link to="/compose">Compose</Link>
      </p>

      <p>
        <Link to="/entries">Entries</Link>
      </p>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function EntryDisplay({ match }) {
  const styles = {
    margin: '28px auto',
    maxWidth: '760px',
  };

  return (
    <div className="composer">
      <div style={{ height: '30vh' }} className="flex vertical flex-child">
        <p className="entry-title center-text flex-child">
          <Link to="/compose">Create</Link>
        </p>
        <p className="entry-title center-text flex-child">
          <Link to="/entries">Read</Link>
        </p>
      </div>

      <div className="foot right-align">
        <p>Created by William Bruntrager</p>
      </div>
    </div>
  );
}

export default EntryDisplay;

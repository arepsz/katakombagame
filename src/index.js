import React from 'react';
import ReactDOM from 'react-dom/client';
import Game from './components/mainpage.js';
import ErrorBoundary from './components/errorboundary.js';
  
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <Game/>
  </ErrorBoundary>
)


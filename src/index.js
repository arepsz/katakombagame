import React from 'react';
import ReactDOM from 'react-dom/client';
import Game from './components/mainpage.js';
import ErrorBoundary from './components/errorboundary.js';

//Root létrehozása, itt jelenik meg az összes komponens
const root = ReactDOM.createRoot(document.getElementById('root'));
//Azz ErrorBoundary kapja el az összes hibát, ezeket tulajdonképpen a megjelent felület "kezeli"
root.render(
  <ErrorBoundary>
    <Game/>
  </ErrorBoundary>
)


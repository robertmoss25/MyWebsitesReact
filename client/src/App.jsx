import React from 'react';
import './app.css';
import Navigation from './components/navbar.js';
import Routes from './Routes';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes />
    </div>
  );
}

export default App;
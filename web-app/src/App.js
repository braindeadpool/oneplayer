import React from 'react';
import './App.css';
import PlayerContainer from './components/PlayerContainer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>
          OnePlayer: Music player from any source of music.
        </h2>
        <h3>Mix and match to ceate your own library.</h3>
        <p>
          Status: Proof-of-concept, Supported sources: Spotify, Youtube.
        </p>
      </header>
      <body>
        <PlayerContainer />
      </body>
    </div>
  );
}

export default App;

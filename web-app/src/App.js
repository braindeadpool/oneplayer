import React from 'react';
import './App.css';
import PlayerContainer from './components/PlayerContainer';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <CssBaseline />
        <header className="App-header">
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
          <h2>
            OnePlayer: Music player from any source of music.
        </h2>
          <h3>Mix and match to ceate your own library.</h3>
          <p>
            Status: Proof-of-concept, Supported sources: Spotify, Youtube.
        </p>
        </header>

        <div className="body">

          <PlayerContainer/>

        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;

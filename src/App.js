import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Game from './components/Game';
import InitializeHuman from './components/InitializeHuman';


// Home page will be a welcome message with instructions saying to drag ship to board then
// press play
function App() {
  return (
    <Router>
      <div className="App">
        <div className="Header">
          <h1>Battleship</h1>
        </div>
        <Switch>
          {/* <Route exact path="/">
            <Home />
          </Route> */}
          <Route exact path="/">
            <InitializeHuman />
          </Route>
          {/* <Route exact path="/game">
            <Game />
          </Route> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;

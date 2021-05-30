import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import GameBoardFactory from './factories/GameBoardFactory';
import Game from './components/Game';
import InitializeHumanBoard from './components/InitializeHumanBoard';


function App() {
  const [ humanBoard, setHumanBoard ] = useState(GameBoardFactory());

  const handleBoardUpdate = (newBoard) => {
    setHumanBoard(newBoard);
  }

  return (
    <Router>
      <div className="App">
        <div className="Header">
          <h1>Battleship</h1>
        </div>
        <Switch>
          <Route exact path="/">
            <InitializeHumanBoard humanBoard={humanBoard} updateBoard={handleBoardUpdate}/>
          </Route>
          <Route exact path="/game">
            <Game humanBoard={humanBoard} updateBoard={handleBoardUpdate}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

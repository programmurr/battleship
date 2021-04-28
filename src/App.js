import React, { useState, useEffect } from 'react';
import Boards from './components/Boards';
import GameBoardFactory from './factories/GameBoardFactory';
import ShipFactory from './factories/ShipFactory';
import PlayerFactory from './factories/PlayerFactory';


function App() {

  const [ playerBoard, setPlayerBoard ] = useState(GameBoardFactory());
  const [ computerBoard, setComputerBoard ] = useState(GameBoardFactory());

  const [ player, setPlayer ] = useState(PlayerFactory());
  const [ computer, setComputer ] = useState(PlayerFactory());

  const [ userTurn, setUserTurn ] = useState(true);
  let [ roundCounter, setRoundCounter ] = useState(0);

  const playerCoords = [
    ['A1', 'A2', 'A3', 'A4'],
    ['B1', 'B2', 'B3'],
    ['C1', 'C2', 'C3'],
    ['D1', 'D2'],
    ['E1', 'E2'],
    ['F1', 'F2'],
    ['G1'],
    ['H1'],
    ['I1'],
    ['J1'],
  ]

  const computerCoords = [
    ['J7', 'J8', 'J9', 'J10'],
    ['I8', 'I9', 'I10'],
    ['H8', 'H9', 'H10'],
    ['G9', 'G10'],
    ['F9', 'F10'],
    ['E9', 'E10'],
    ['D10'],
    ['C10'],
    ['B10'],
    ['A10'],
  ]

  const sleep = (delay) => {
    return new Promise((resolve) => {
      return setTimeout(resolve, delay);
    });
  }


  const initializeBoards = (identifier, coords) => {
    if (identifier === 'Player') {
      coords.forEach((coord) => {
        playerBoard.placeShip(coord, ShipFactory(coord.length))
        setPlayerBoard(playerBoard)
      })
    } else {
      coords.forEach((coord) => {
        computerBoard.placeShip(coord, ShipFactory(coord.length))
        setComputerBoard(computerBoard)
      })
    }
  }


  const computerTurn = () => {
    if (userTurn === false) {
      const newComputer = Object.assign({}, computer);
      const newPlayerBoard = Object.assign({}, playerBoard);
      
      const computerAttacks = newComputer.computerAttack();
      const currentAttack = computerAttacks.slice(computerAttacks.length - 1);
      const attackedCell = newPlayerBoard.receiveAttack(currentAttack[0]);
      if (attackedCell !== undefined) {
        newPlayerBoard.successfulAttacks.push(currentAttack[0]);
      }

      setPlayerBoard(newPlayerBoard);
      setComputer(newComputer);
      setUserTurn(true);
      setRoundCounter(roundCounter += 1);
    }
  }

  // Initialize Boards on page load
  useEffect(() => {
    if (roundCounter === 0) {
      initializeBoards('Player', playerCoords);
      initializeBoards('Computer', computerCoords);
    }
  }, [])

  // Trigger game loop after every refresh
  useEffect(() => {
    setTimeout(() => computerTurn(), 2000);
  }, [userTurn])

  const handleClick = (coord) => {
    if (userTurn) {
      const newPlayer = Object.assign({}, player);
      const newComputerBoard = Object.assign({}, computerBoard);
      try {
        const attackedCells = newComputerBoard.receiveAttack(coord);
        if (attackedCells !== undefined) {
          newComputerBoard.successfulAttacks.push(coord);
        }
        newPlayer.humanAttack(coord);
        setUserTurn(false);
        setPlayer(newPlayer);
        setComputerBoard(newComputerBoard)
      } catch (e) {
        alert(e.message)
      }
    }
  }

  return (
    <div className="App">
      <div className="Header">
        <h1>Battleship</h1>
      </div>
      {userTurn ? 
          <div className="Turn">
            Your Turn!
          </div>
        : <div className="Turn">
            Computer's Turn!
          </div>
      }
      <Boards 
        playerBoard={playerBoard}
        computerBoard={computerBoard}
        handleClick={handleClick}
      />
    </div>
  );
}

export default App;

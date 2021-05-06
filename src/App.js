import React, { useState, useEffect } from 'react';
import Boards from './components/Boards';
import GameBoardFactory from './factories/GameBoardFactory';
import ShipFactory from './factories/ShipFactory';
import PlayerFactory from './factories/PlayerFactory';
import Ship4 from './img/ship4.png';
import Ship3 from './img/ship3.png';
import Ship2 from './img/ship2.png';
import Ship1 from './img/ship1.png';


function App() {

  const [ player, setPlayer ] = useState(PlayerFactory());
  const [ computer, setComputer ] = useState(PlayerFactory());

  const [ playerBoard, setPlayerBoard ] = useState(GameBoardFactory());
  const [ computerBoard, setComputerBoard ] = useState(GameBoardFactory());

  const [ userTurn, setUserTurn ] = useState(true);
  let [ roundCounter, setRoundCounter ] = useState(false);

  // For implementing drag and drop
  const [ dragItem, setDragItem ] = useState();
  const [ playerShips, setPlayerShips ] = useState([
    ShipFactory(4),
    ShipFactory(3),
    ShipFactory(3),
    ShipFactory(2),
    ShipFactory(2),
    ShipFactory(2),
    ShipFactory(1),
    ShipFactory(1),
    ShipFactory(1),
    ShipFactory(1),
  ]);

  const shipImages = [
    [Ship4, 4],
    [Ship3, 3],
    [Ship3, 3],
    [Ship2, 2],
    [Ship2, 2],
    [Ship2, 2],
    [Ship1, 1],
    [Ship1, 1],
    [Ship1, 1],
    [Ship1, 1]
  ];

  const playerCoords = [
    ['A1', 'A2', 'A3', 'A4'],
    ['I7', 'I8', 'I9'],
    ['B8', 'C8', 'D8'],
    ['C5', 'D5'],
    ['J1', 'J2'],
    ['A10', 'B10'],
    ['H7'],
    ['G3'],
    ['E2'],
    ['F7'],
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

  const initializeBoards = (identifier, coords) => {
    if (identifier === 'Player') {
      // initialize drag and drop
      coords.forEach((coord) => {
        playerBoard.placeShip(coord, ShipFactory(coord.length))
        setPlayerBoard(playerBoard)
      })
    } else {
      // randomize the coords
      // match an orientation to the coords
      // placeShip with coord, Ship and orientation
      coords.forEach((coord) => {
        computerBoard.placeShip(coord, ShipFactory(coord.length))
        setComputerBoard(computerBoard)
      })
    }
  }

  const computerTurn = () => {
    if (playerBoard.allShipsSunk()) {
      alert('Game over! The Computers won!');
      setUpNewGame();
      return;
    }
    if (userTurn === false) {
      const newComputer = Object.assign({}, computer);
      const newPlayerBoard = Object.assign({}, playerBoard);
      const computerAttacks = newComputer.computerAttack();
      const currentAttack = computerAttacks[computerAttacks.length - 1];
      if (newPlayerBoard.receiveAttack(currentAttack) !== undefined) {
        computer.calculateNextAttackRange(currentAttack, newPlayerBoard.board);
      }
      setPlayerBoard(newPlayerBoard);
      setComputer(newComputer);
      setUserTurn(true);
      setRoundCounter(roundCounter += 1);
    }
  }

  useEffect(() => {
    if (roundCounter === 0) {
      initializeBoards('Player', playerCoords);
      initializeBoards('Computer', computerCoords);
    }
  })

  useEffect(() => {
    if (computerBoard.allShipsSunk()) {
      alert('Game over! Humans won!');
      setUpNewGame();
      return;
    }
    setTimeout(() => computerTurn(), 0);
  }, [userTurn])

  const setUpNewGame = () => {
    setUserTurn(true);
    setPlayer(PlayerFactory());
    setComputer(PlayerFactory());
    setPlayerBoard(GameBoardFactory());
    setComputerBoard(GameBoardFactory());
    setRoundCounter(0);
  }

  const handlePlayerTurn = (coord) => {
    if (userTurn) {
      const newPlayer = Object.assign({}, player);
      const newComputerBoard = Object.assign({}, computerBoard);
      try {
        newComputerBoard.receiveAttack(coord);
        newPlayer.humanAttack(coord);
        setUserTurn(false);
        setPlayer(newPlayer);
        setComputerBoard(newComputerBoard);
        setRoundCounter(roundCounter += 1);
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
      <div className="GameControl">
        {roundCounter === false ?
          shipImages.map((ship, index) => (
            <img 
              key={`shipImage${index}`}
              src={ship[0]} 
              alt="Ship" 
              className={`Ship${ship[1]}`}
            />
          ))
          : <div className="TurnDisplay">
              {userTurn ? 
                <div className="Turn">
                  Your Turn!
                </div>
              : <div className="Turn">
                  Computer's Turn!
                </div>
        }
            </div>
        }
      </div>
      <Boards 
        playerBoard={playerBoard}
        computerBoard={computerBoard}
        handlePlayerTurn={handlePlayerTurn}
      />
    </div>
  );
}

export default App;

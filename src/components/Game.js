import React, { useState, useEffect } from 'react';
import Boards from './Boards';
import GameBoardFactory from '../factories/GameBoardFactory';
import ShipFactory from '../factories/ShipFactory';
import PlayerFactory from '../factories/PlayerFactory';

function Game(props) {
  const { humanBoard } = props;

  const [ player, setPlayer ] = useState(PlayerFactory());
  const [ computer, setComputer ] = useState(PlayerFactory());
  const [ computerBoard, setComputerBoard ] = useState(GameBoardFactory());
  const [ userTurn, setUserTurn ] = useState(true);
  let [ roundCounter, setRoundCounter ] = useState(0);

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

  const initializeComputerBoard = (coords) => {
    // randomize the coords
    // match an orientation to the coords
    // placeShip with coord, Ship and orientation
    coords.forEach((coord) => {
      computerBoard.placeShip(coord, ShipFactory(coord.length))
      setComputerBoard(computerBoard)
    })
  }

  const computerTurn = () => {
    if (humanBoard.allShipsSunk()) {
      if (window.confirm('Oh no! You lost! Would you like to redeem yourself and play again?')) {
        window.location.reload();
      }
      // worry about the user clicking cancel when we get there
    }
    if (userTurn === false) {
      const newComputer = Object.assign({}, computer);
      const newHumanBoard = Object.assign({}, humanBoard);
      const computerAttacks = newComputer.computerAttack();
      let currentAttack = computerAttacks[computerAttacks.length - 1];
      if (typeof currentAttack !== 'string') {
        currentAttack = currentAttack.hull[0]
      }
      if (newHumanBoard.receiveAttack(currentAttack) !== undefined) {
        computer.calculateNextAttackRange(currentAttack, newHumanBoard.board);
        console.log(newHumanBoard);
      }
      props.updateBoard(newHumanBoard);
      setComputer(newComputer);
      setUserTurn(true);
      setRoundCounter(roundCounter += 1);
    }
  }

  useEffect(() => {
    if (roundCounter === 0) {
      initializeComputerBoard(computerCoords);
    }
  })

  useEffect(() => {
    if (computerBoard.allShipsSunk()) {
      if (window.confirm('Congratulations! You won! Would you like to play again?')) {
        window.location.reload();
      }
      // worry about the user clicking cancel when we get there
    }
    setTimeout(() => computerTurn(), 0);
  }, [userTurn])

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
    <div className="Game">
      <div className="GameControl">
          <div className="TurnDisplay">
            {userTurn ? 
              <div className="Turn">
                Your Turn!
              </div>
            : <div className="Turn">
                Computer's Turn!
              </div>
            }
          </div>
      </div>
      <Boards 
        humanBoard={humanBoard}
        computerBoard={computerBoard}
        handlePlayerTurn={handlePlayerTurn}
      />
    </div>
  )
}

export default Game;
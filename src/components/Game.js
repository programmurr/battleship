import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  const [ roundCounter, setRoundCounter ] = useState(0);
  const [ humanWin, setHumanWin ] = useState(false);
  const [ computerWin, setComputerWin ] = useState(false);


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

  const resetGame = () => {
    setPlayer(PlayerFactory());
    setComputer(PlayerFactory());
    setComputerBoard(GameBoardFactory());
    setUserTurn(true);
    setRoundCounter(0);
    setHumanWin(false);
    setComputerWin(false);
    props.resetHumanBoard();
  }

  const computerTurn = () => {
    if (humanBoard.allShipsSunk()) {
      setComputerWin(true);
      return;
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
      }
      props.updateBoard(newHumanBoard);
      setComputer(newComputer);
      setUserTurn(true);
      setRoundCounter(roundCounter + 1);
    }
  }

  useEffect(() => {
    if (roundCounter === 0) {
      initializeComputerBoard(computerCoords);
    }
  })

  useEffect(() => {
    if (computerBoard.allShipsSunk()) {
      setHumanWin(true);
      return;
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
        setRoundCounter(roundCounter + 1);
      } catch (e) {
        alert(e.message)
      }
    }
  }

  return (
    <div className="Game">
      <div className="GameControl">
      {humanWin ? 
        <div className="VictoryDeclaration">
          Congratulations! You won! 
          <Link to="/" onClick={resetGame}> 
            Click here to play again!
          </Link>
        </div>
        : computerWin ? 
          <div className="VictoryDeclaration">
            Oh no, you lost! 
            <Link to="/" onClick={resetGame}> 
              Click here to redeem yourself and play again!
            </Link>
          </div>
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
        humanBoard={humanBoard}
        computerBoard={computerBoard}
        handlePlayerTurn={handlePlayerTurn}
      />
    </div>
  )
}

export default Game;
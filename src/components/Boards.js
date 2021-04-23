import { useEffect, useState } from 'react';
import GameBoardFactory from '../factories/GameBoardFactory';
import ShipFactory from '../factories/ShipFactory';

function Boards(props) {
  const [ playerBoard, setPlayerBoard ] = useState(GameBoardFactory());
  const [ computerBoard, setComputerBoard ] = useState(GameBoardFactory());
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

  const initialize = (identifier, coords) => {
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

  useEffect(() => {
    console.log('Board effect')
    initialize('Player', playerCoords);
    initialize('Computer', computerCoords);
  })

  const handleClick = (event) => {
    props.onClick(event.target.textContent)
  }

  return (
    <div className="Boards">
      <h2 className="PlayerBoardHeader">Player Board</h2>
      <div className="PlayerBoard">
        {playerBoard.board.map((row) => (
          row.map((cell) => (
            playerCoords.flat().includes(cell) ? 
              <div
                key={cell} 
                className="PlayerCell"
                onClick={handleClick}
              >
                S
              </div>
            : <div
                key={cell} 
                className="PlayerCell"
                onClick={handleClick}
              >
                {cell}
              </div>
          ))
        ))}
      </div>
      <h2 className="ComputerBoardHeader">Computer Board</h2>
      <div className="ComputerBoard">
        {computerBoard.board.map((row) => (
          row.map((cell) => (
            computerCoords.flat().includes(cell) ?
              <div 
                key={cell} 
                className="ComputerCell"
                onClick={handleClick}
              >
                S
              </div>
            : <div 
                key={cell} 
                className="ComputerCell"
                onClick={handleClick}
              >
                {cell}
              </div>
          ))
        ))}
      </div>
    </div>
  )
}

export default Boards;
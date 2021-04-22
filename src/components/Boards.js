import { useState } from 'react';
import GameBoardFactory from '../factories/GameBoardFactory';

function Boards(props) {
  const [ playerBoard, setPlayerBoard ] = useState(GameBoardFactory());
  const [ computerBoard, setComputerBoard ] = useState(GameBoardFactory());

  return (
    <div className="Boards">
      <h2 className="PlayerBoardHeader">Player Board</h2>
      <div className="PlayerBoard">
        {playerBoard.board.map((row) => (
          row.map((cell) => (
            <div className="PlayerCell">{cell}</div>
          ))
        ))}
      </div>
      <h2 className="ComputerBoardHeader">Computer Board</h2>
      <div className="ComputerBoard">
        {computerBoard.board.map((row) => (
          row.map((cell) => (
            <div className="ComputerCell">{cell}</div>
          ))
        ))}
      </div>
    </div>
  )
}

export default Boards;
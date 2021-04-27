import React, { useEffect, useState } from 'react';
import BlackCircle from '../img/black-circle.svg';
import RedCircle from '../img/red-circle.svg';

function Boards(props) {

  const { playerBoard, computerBoard } = props;
  
  const handleClick = (event) => {
    props.handleClick(event.target.textContent)
  }

  return (
    <div className="Boards">
      <h2 className="PlayerBoardHeader">Player Board</h2>
      <div className="PlayerBoard">
        {playerBoard.board.map((row) => (
          row.map((cell) => {
            if (playerBoard.missedAttacks.includes(cell)) {
              return (
                <div 
                  key={cell} 
                  className="PlayerCell"
                >
                  <img 
                    className="MissIcon" 
                    src={BlackCircle} 
                    alt="Missed Attack"
                  />
                </div>
              )
            } else if (playerBoard.successfulAttacks.includes(cell)) {
              return (
                <div 
                  key={cell} 
                  className="PlayerCell"
                >
                  <img 
                    className="HitIcon" 
                    src={RedCircle} 
                    alt="Missed Attack"
                  />
                </div>
              )
            } else {
              return (
                <div 
                  key={cell} 
                  className="PlayerCell"
                >
                  {cell}
                </div>
              )
            }
          })
        ))}
      </div>
      <h2 className="ComputerBoardHeader">Computer Board</h2>
      <div className="ComputerBoard">
        {computerBoard.board.map((row) => (
          row.map((cell) => {
            if (computerBoard.missedAttacks.includes(cell)) {
              return (
                <div 
                  key={cell} 
                  className="ComputerCell"
                >
                  <img 
                    className="MissIcon" 
                    src={BlackCircle} 
                    alt="Missed Attack"
                  />
                </div>
              )
            } else if (computerBoard.successfulAttacks.includes(cell)) {
              return (
                <div 
                  key={cell} 
                  className="ComputerCell"
                >
                  <img 
                    className="HitIcon" 
                    src={RedCircle} 
                    alt="Missed Attack"
                  />
                </div>
              )
            } else {
              return (
                <div 
                  key={cell} 
                  className="ComputerCell"
                  onClick={handleClick}
                >
                  {cell}
                </div>
              )
            }
          })
        ))}
      </div>
    </div>
  )
}

export default Boards;
import React from 'react';
import BlackCircle from '../img/black-circle.svg';
import RedCircle from '../img/red-circle.svg';

function Boards(props) {

  const { humanBoard, computerBoard } = props;
  
  const handleClick = (event) => {
    props.handlePlayerTurn(event.target.textContent)
  }

  // The game is detecting a hit on the 'root' placement of a ship as a miss
  // E.g. Ship of H length 4 placed on A1
  // A2, A3, A4 get recognised as hits
  // A1 doesn't get recognised as a hit, black spot placed, ship image disappears
  return (
    <div className="Boards">
      <h2 className="HumanBoardHeader">Human Board</h2>
      <div className="HumanBoard">
        {humanBoard.board.map((row, rowIndex) => (
          row.map((cell, cellIndex) => {
            if (humanBoard.missedAttacks.includes(cell)) {
              return (
                <div key={cell} className="PlayerCell">
                  <img 
                    className="MissIcon" 
                    src={BlackCircle} 
                    alt="Missed Attack"
                  />
                </div>
              )
            } else if (humanBoard.successfulAttacks.includes(cell)) {
              // cell is an object, so it's not detecting the hit
              return (
                <div key={cell} className="PlayerCell">
                  <img 
                    className="HitIcon" 
                    src={RedCircle} 
                    alt="Successful Attack"
                  />
                </div>
              )
            } else if (
                typeof cell === 'object' 
                && humanBoard.successfulAttacks.includes(cell.hull[0])
              ) {
                return (
                  <div 
                    key={`Cell${rowIndex}${cellIndex}`} 
                    className={`PlayerCellOccupied${cell.orientation}`}
                  >
                    <img
                      key={`ShipImage${cell.hull.length}`} 
                      src={cell.src}
                      alt={`Ship of Length ${cell.hull.length}`}
                      className={`BoardShip${cell.hull.length}`}
                    />
                    <img 
                      className="HitIcon" 
                      src={RedCircle} 
                      alt="Successful Attack"
                    />
                  </div>
                )
            } else if (typeof cell === 'string') {
              return (
                <div 
                  key={`Cell${rowIndex}${cellIndex}`} 
                  className="PlayerCell"
                >
                  <span className="CellCoord">{cell}</span>
                </div>
              )
            } else {
              return (
                <div 
                  key={`Cell${rowIndex}${cellIndex}`} 
                  className={`PlayerCellOccupied${cell.orientation}`}
                ><span className={`CellCoordOccupied${cell.orientation}`}>{cell.hull[0]}</span>
                  <img
                    key={`ShipImage${cell.hull.length}`} 
                    src={cell.src}
                    alt={`Ship of Length ${cell.hull.length}`}
                    className={`BoardShip${cell.hull.length}`}
                  />
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
                <div key={cell} className="ComputerCell">
                  <img 
                    className="MissIcon" 
                    src={BlackCircle} 
                    alt="Missed Attack"
                  />
                </div>
              )
            } else if (computerBoard.successfulAttacks.includes(cell)) {
              return (
                <div key={cell} className="ComputerCell">
                  <img 
                    className="HitIcon" 
                    src={RedCircle} 
                    alt="Missed Attack"
                  />
                </div>
              )
            } else {
              return (
                <div key={cell} className="ComputerCell" onClick={handleClick}>
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
import React, { useEffect, useState } from 'react';
import GameBoardFactory from '../factories/GameBoardFactory';
import ShipFactory from '../factories/ShipFactory';
import PlayerFactory from '../factories/PlayerFactory';
import RotateButton from '../img/rotate.png';


function InitializeHuman() {
  const [ human, setHuman ] = useState(PlayerFactory());
  const [ humanBoard, setHumanBoard ] = useState(GameBoardFactory());
  const [ displayShip, setDisplayShip ] = useState(ShipFactory(1));
  const [ dragItem, setDragItem ] = useState();
  const [ humanShips, setHumanShips ] = useState([
    ShipFactory(1),
    ShipFactory(1),
    ShipFactory(1),
    ShipFactory(1),
    ShipFactory(2),
    ShipFactory(2),
    ShipFactory(2),
    ShipFactory(3),
    ShipFactory(3),
    ShipFactory(4),
  ]);

  useEffect(() => {
    const ship = humanShips.slice(0, 1).shift();
    setDisplayShip(ship);
  }, [humanShips])

  const handleShipRotate = (ship) => {
    if (ship.hull.length === 1) {
      alert('No point in doing that');
      return ;
    }
    const shipCopy = Object.assign({}, ship);
    if (shipCopy.orientation === 'H') {
      shipCopy.orientation = 'V'
    } else {
      shipCopy.orientation = 'H'
    }
    setDisplayShip(shipCopy);
  }

  const handleDragStart = (ship) => {
    setDragItem(ship);
  }

  const handleDrop = (row, cell, coord) => {
    const newBoard = Object.assign({}, humanBoard);
    let newDisplayShip = Object.assign({}, displayShip);
    const newHumanShips = [...humanShips];
    try {
      newDisplayShip.placement(coord, newDisplayShip.orientation);
      newHumanShips.splice(dragItem, 1);
      newBoard.board[row].splice(cell, 1, newDisplayShip);  
      newBoard.placeShip(newDisplayShip.hull, newDisplayShip)
    } catch (err) {
      newBoard.board[row][cell] = coord;
      newDisplayShip = ShipFactory(displayShip.hull.length, displayShip.orientation)
      newHumanShips.unshift(newDisplayShip);
      setHumanBoard(newBoard);
      setHumanShips(humanShips);
      setDisplayShip(newDisplayShip);
      alert(err.message);
      return;
    }
    setHumanShips(newHumanShips);
    setHumanBoard(newBoard);
  }

  const handlePlayClick = () => {
    // Handle if not all ships placed
    // Take player to game page
  }

  return (
    <div className="InitializeHuman">
      <div className="ShipPlacement">
          {humanShips.length > 0
          ? <div className="ShipDragHome">
            Click and drag your ship to the Board!
              <img 
                draggable
                src={displayShip.src}
                alt={`Ship of length ${displayShip.hull.length}`}
                className={`Ship${displayShip.hull.length}${displayShip.orientation}`}
                onDragStart={() => handleDragStart(displayShip)}
              />
              <img 
                className="RotateButton"
                src={RotateButton}
                alt="Rotate Ship Button"
                onClick={() => handleShipRotate(displayShip)}
              />
            </div>
          : <div className="ShipDragHome">
              <button onClick={handlePlayClick}>Start Game!</button>
            </div>
          }
      </div>
      <div className="HumanBoard">
        {humanBoard.board.map((row, rowIndex) => (
          row.map((cell, cellIndex) => {
            if (typeof cell === 'string') {
              return (
                <div 
                  key={`Cell${rowIndex}${cellIndex}`} 
                  className="PlayerCell"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(rowIndex, cellIndex, cell)}
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
    </div>
  );
}

export default InitializeHuman;
import React, { useState } from 'react';
import GameBoardFactory from '../factories/GameBoardFactory';
import ShipFactory from '../factories/ShipFactory';
import PlayerFactory from '../factories/PlayerFactory';
import RotateButton from '../img/rotate.png';


function InitializeHuman() {
  const [ human, setHuman ] = useState(PlayerFactory());
  const [ humanBoard, setHumanBoard ] = useState(GameBoardFactory());
  const [ selectedShip, setSelectedShip ] = useState();
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

  const handleClick = (e) => {
    if (e.target === selectedShip) {
      e.target.style.border = '1px solid #2b73f8';
      setSelectedShip(undefined);
    } else if (selectedShip === undefined) {
      e.target.style.border = '1px solid red';
      setSelectedShip(e.target);
    } else {
      selectedShip.style.border = '1px solid #2b73f8';
      e.target.style.border = '1px solid red';
      setSelectedShip(e.target);
    }
  }

  const updateRotationUI = (direction) => {
    if (direction === 'H') {
      selectedShip.style.transform = 'rotate(360deg)';
    } else {
      selectedShip.style.transform = `rotate(90deg)`;
    }
  }

  const handleShipRotate = () => {
    try {
      const index = parseInt(selectedShip.id);
      const oldShip = humanShips[index];
      const newLength = oldShip.hull.length;
      let newOrientation = "";

      if (newLength === 1) { return };
      if (oldShip.orientation === 'H') {
        newOrientation = 'V';
        updateRotationUI('V');
      } else {
        newOrientation = 'H';
        updateRotationUI('H');
      }
      const newShip = ShipFactory(newLength, newOrientation);
      const newHumanShips = [...humanShips];
      newHumanShips.splice(index, 1, newShip);
      setHumanShips(newHumanShips);
    } catch (e) {
      // Probably because a ship has not been selected
      console.error(e);
    }
  }

  const handleDragStart = (shipIndex) => {
    setDragItem(shipIndex);
  }

  const handleDrop = (e, row, cell, coord) => {
    const newBoard = Object.assign({}, humanBoard);
    const newHumanShips = [...humanShips];
    const ship = newHumanShips[dragItem];
    try {
      ship.placement(coord);
      newHumanShips.splice(dragItem, 1);
      newBoard.board[row].splice(cell, 1, ship);
      console.log(newBoard.board)
      setHumanShips(newHumanShips);
      setHumanBoard(newBoard);
    } catch (err) {
      // Probably because they placed the ship out of bounds
      console.error(err.message)
    }
  }

  const handlePlayClick = () => {
    // Handle if not all ships placed
    // Take player to game page
  }

  return (
    <div className="InitializeHuman">
      <div className="ShipSelection">
        <div className="ShipSelector">
          {humanShips.map((ship, index) => (
            <img 
              draggable
              key={`ShipImage${index}`}
              id={`${index}`}
              src={ship.src}
              alt={`Ship of length ${ship.hull.length}`}
              className={`Ship${ship.hull.length}`}
              onClick={handleClick}
              onDragStart={() => handleDragStart(index)}
            />
          ))}
        </div>
        <div className="RotateSection">
          <img 
            className="RotateButton"
            src={RotateButton}
            alt="Rotate Ship Button"
            onClick={handleShipRotate}
          />
          <button onClick={handlePlayClick}>Start Game!</button>
        </div>
        <div className="StartPlaySection">
        </div>
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
                  onDrop={(e) => handleDrop(e, rowIndex, cellIndex, cell)}
                >
                  <span className="CellCoord">{cell}</span>
                </div>
              )
            } else {
              return (
                <div 
                  key={`Cell${rowIndex}${cellIndex}`} 
                  className="PlayerCell"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(e, rowIndex, cellIndex, cell)}
                ><span className="CellCoord">{cell.hull[0]}</span>
                  <img
                    key={`ShipImage${cell.hull.length}`} 
                    src={cell.src}
                    alt={`Ship of Length ${cell.hull.length}`}
                    className={`BoardShip${cell.hull.length}${cell.orientation}`}
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
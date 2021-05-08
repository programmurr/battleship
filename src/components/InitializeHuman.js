import React, { useState } from 'react';
import GameBoardFactory from '../factories/GameBoardFactory';
import ShipFactory from '../factories/ShipFactory';
import PlayerFactory from '../factories/PlayerFactory';
import Ship4 from '../img/ship4.png';
import Ship3 from '../img/ship3.png';
import Ship2 from '../img/ship2.png';
import Ship1 from '../img/ship1.png';
import RotateButton from '../img/rotate.png';


function InitializeHuman() {
  const [ human, setHuman ] = useState(PlayerFactory());
  const [ humanBoard, setHumanBoard ] = useState(GameBoardFactory());
  const [ selectedShip, setSelectedShip ] = useState();
  const [ dragItem, setDragItem ] = useState();
  const [ humanShips, setHumanShips ] = useState([
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

  // Need to fix spacing around ships so they don't overlap when rotating
  const handleShipRotate = () => {
    const index = parseInt(selectedShip.id);
    const oldShip = humanShips[index];
    const newLength = oldShip.hull.length;
    let newOrientation = "";
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
  }

  const handleDragStart = (index) => {
    setDragItem(index);
  }

  const handleDragEnter = (e, index) => {
    const newBoard = Object.assign({}, humanBoard);
    const shipPlacement = newBoard.board[dragItem];
    newBoard.board.splice(dragItem, 1);
    newBoard.board.splice(index, 0, shipPlacement);
    setDragItem(index);
    setHumanBoard(newBoard);
  }

  return (
    <div className="InitializeHuman">
      <div className="ShipSelection">
        <div className="ShipSelector">
          {shipImages.map((ship, index) => (
            <img 
              draggable
              key={`ShipImage${index}`}
              id={`${index}`}
              src={ship[0]}
              alt="Ship"
              className={`Ship${ship[1]}`}
              onClick={handleClick}
              onDragStart={() => handleDragStart(index)}
              onDragEnter={(e) => handleDragEnter(e, index)}
              onDragOver={(e) => e.preventDefault()}
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
        </div>
      </div>
      <div className="HumanBoard">
        {humanBoard.board.map((row, rowIndex) => (
          row.map((cell, cellIndex) => (
            <div key={`Cell${rowIndex}${cellIndex}`} className="PlayerCell">
              {cell}
            </div>
          ))
        ))}
      </div>
    </div>
  );
}

export default InitializeHuman;
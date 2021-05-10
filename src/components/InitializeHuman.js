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

  const [ shipImages, setShipImages ] = useState([
    [Ship1, 1],
    [Ship1, 1],
    [Ship1, 1],
    [Ship1, 1],
    [Ship2, 2],
    [Ship2, 2],
    [Ship2, 2],
    [Ship3, 3],
    [Ship3, 3],
    [Ship4, 4]
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

  const handleDragEnter = (e, row, cell) => {
    const newBoard = Object.assign({}, humanBoard);
    const newHumanShips = [...humanShips];
    const newShipImages = [...shipImages];
    const ship = newHumanShips[dragItem];
    // const shipPlacement = newBoard.board[row][cell];
    newHumanShips.splice(dragItem, 1);
    newShipImages.splice(dragItem, 1);
    newBoard.board[row].splice(cell, 0, ship);
    console.log(newBoard.board)
    // setDragItem(index);
    setHumanShips(newHumanShips);
    setShipImages(newShipImages);
    setHumanBoard(newBoard);
  }

  const handlePlayClick = () => {
    // Handle if not all ships placed
    // Take player to game page
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
                  onDragEnter={(e) => handleDragEnter(e, rowIndex, cellIndex)}
                  onDragOver={(e) => e.preventDefault()}
                >
                  {cell}
              </div>
              )
            } else {
              return (
                <div>S</div>
              )
            }
          })
        ))}
      </div>
    </div>
  );
}

export default InitializeHuman;
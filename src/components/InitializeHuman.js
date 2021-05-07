import React, { useState } from 'react';
import GameBoardFactory from '../factories/GameBoardFactory';
import ShipFactory from '../factories/ShipFactory';
import PlayerFactory from '../factories/PlayerFactory';
import HumanBoard from './HumanBoard';
import Ship4 from '../img/ship4.png';
import Ship3 from '../img/ship3.png';
import Ship2 from '../img/ship2.png';
import Ship1 from '../img/ship1.png';


function InitializeHuman() {
  const [ human, setHuman ] = useState(PlayerFactory());
  const [ humanBoard, setHumanBoard ] = useState(GameBoardFactory());

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

  return (
    <div className="InitializeHuman">
      <div className="ShipSelection">
        <div className="ShipSelector">
          <div className="ShipImage">
            Ship Image Here
          </div>
          <div className="RotateButton">
            RotateButton
          </div>
        </div>
      </div>
      <div className="HumanBoard">
        Human Board
      </div>
      {/* <div className="HumanBoard">
        {humanBoard.board.map((row, rowIndex) => (
          row.map((cell, cellIndex) => (
            <div key={`Cell${rowIndex}${cellIndex}`} className="PlayerCell">
              {cell}
            </div>
          ))
        ))}
      </div> */}
    </div>
  );
}

export default InitializeHuman;
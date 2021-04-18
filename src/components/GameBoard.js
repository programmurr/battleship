// Create a GameBoard factory.
// GameBoards should be able to place ships at specific coordinates by calling 
// the ship factory function.
// GameBoards should have a receiveAttack() function that takes a pair of coordinates,
// determines whether or not the attack hit a ship and then sends the 'hit' function
// to the correct shp, or records the coordinates of the missed shot.
// Gameboards should keep track of the missed attacks so they can display them properly.
// GameBoards should be able to report whether or not all of their ships have been sunk.
// 1 x 4 length ship
// 2 x 3 length ship
// 3 x 2 length ship
// 4 x 1 length ship
import Ship from './Ship';

var lodash = require('lodash')

function GameBoard() {

  let occupiedCoords = [];
  let missedAttacks = [];

  const createBoard = () => {
    const height = lodash.range(1, 11);
    const length = lodash.range(65, 75).map((code) => String.fromCharCode(code));
    const board = height.map((num) => {
      return length.map((char) => {
        return `${char}${num}`;
      });
    });
    return board;
  }

  const board = createBoard();

  const placeShip = (coords, ship) => {
    occupiedCoords.push([ship, coords]);
    return occupiedCoords;
  }

  const receiveAttack = (coord) => {
    // pair[0] is the ship
    // pair[1] is an array of the ship coords
    occupiedCoords.forEach((pair) => {
      if (pair[1].includes(coord)) {
        const index = pair[1].findIndex((x) => x === coord);
        pair[0].hit(index);
      } else {
        missedAttacks.push(coord);
      }
    })
  }

  const allShipsSunk = () => {
    let counter = 0;
    occupiedCoords.forEach((pair) => {
      if (pair[0].isSunk()) {
        counter += 1;
      }
    });
    if (counter === 10) {
      return true;
    }
    return false;
  }

  return { 
    board, 
    placeShip, 
    receiveAttack, 
    occupiedCoords, 
    missedAttacks,
    allShipsSunk 
  };
}

export default GameBoard;
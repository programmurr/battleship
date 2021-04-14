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

  let occupiedMap = {};


  const placeShip = (coords, ship) => {
    occupiedMap[coords.length] = [coords, ship];
    return occupiedMap;
  }

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

  const receiveAttack = (coord) => {
    Object.values(occupiedMap).forEach((pair) => {
      if (pair[0].includes(coord)) {
        const index = pair[0].findIndex((x) => x === coord);
        pair[1].hit(index);
      }
    })
  }

  const board = createBoard();

  return { board, placeShip, occupiedMap, receiveAttack };
}

export default GameBoard;
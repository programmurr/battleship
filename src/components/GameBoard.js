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

  const generateCoord = (shipLength) => {
    let coord = Math.floor(Math.random() * 10);
    while ((coord + shipLength) > 9) {
      coord = Math.floor(Math.random() * 10);
    }
    return coord;
  }

  const placeShip = (coords, ship) => {
    occupiedCoords.push([ship, coords]);
    return occupiedCoords;
  }

  const initialize = () => {
    const ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
    ships.forEach((shipLength) => {
      const x = generateCoord(shipLength);
      const y = generateCoord(shipLength);
      const initialCoord = board[x][y];
      const coordinates = [ initialCoord ];
      const direction = Math.floor(Math.random() * (3 - 1) + 1);
      if (direction === 1) {
        for (let i = x + 1; i <= x + (shipLength - 1); i++) {
          const coord = board[i][y];
          if (coord === 'occupied') {
            i--;
          } else {
            board[i][y] = 'occupied';
            coordinates.push(coord);
          }
        }
      } else {
        for (let i = y + 1; i <= y + (shipLength - 1); i++) {
          const coord = board[x][i];
          if (coord === 'occupied') {
            i--;
          } else {
            board[i][y] = 'occupied';
            coordinates.push(coord);
          }
        }
      }
      const newShip = Ship(shipLength);
      placeShip(coordinates, newShip);
    });
  }


  const receiveAttack = (coord) => {
    occupiedCoords.forEach((pair) => {
      if (pair[1].includes(coord)) {
        const index = pair[1].findIndex((x) => x === coord);
        pair[0].hit(index);
      }
    })
  }

  return { initialize, board, placeShip, receiveAttack, occupiedCoords };
}

export default GameBoard;
var lodash = require('lodash')

function GameBoardFactory() {

  let occupiedCoords = [];
  let missedAttacks = [];
  let successfulAttacks = [];

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
    for (let i = 0; i < occupiedCoords.length; i++) {
      const pair = occupiedCoords[i];
      if (pair[1].includes(coord)) {
        const index = pair[1].findIndex((x) => x === coord);
        pair[0].hit(index);
        return pair;
      }
    }
    missedAttacks.push(coord);
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
    successfulAttacks,
    allShipsSunk 
  };
}

export default GameBoardFactory;
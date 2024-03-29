import GameUtils from '../utils/GameUtils';

function GameBoardFactory() {

  let occupiedCoords = [];
  let missedAttacks = [];
  let successfulAttacks = [];

  const board = GameUtils().mockBoard;

  const placeShip = (coords, ship) => {
    // pair[0] is the ship
    // pair[1] is an array of the ship coords
    for (let i = 0; i < occupiedCoords.length; i++) {
      const pair = occupiedCoords[i];
      for (let j = 0; j < coords.length ;j++) {
        const currentCoord = coords[j];
        if (pair[1].includes(currentCoord)) {
          throw new Error('Ship placement overlaps');
        }
      }
    }
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
        successfulAttacks.push(coord);
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
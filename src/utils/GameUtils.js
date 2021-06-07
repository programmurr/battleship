import { difference } from 'lodash';

var lodash = require('lodash');

export default function GameUtils() {
  const boardHeight = lodash.range(1, 11);
  const boardLength = lodash.range(65, 75).map((code) => String.fromCharCode(code));

  const mockBoard = boardHeight.map((num) => {
    return boardLength.map((char) => {
      return `${char}${num}`;
    });
  });

  const coordIndexes = (coord, board) => {
    for (let i = 0; i < board.length; i++) {
      const row = board[i];
      for (let j = 0; j < row.length; j++) {
        const cell = row[j];
        if (typeof cell === 'string' && cell === coord) {
          return [i, j];
        } else if (typeof cell !== 'string' && cell.hull[0] === coord) {
          return [i, j];
        }
      }
    }
  }

  const randomCoord = () => {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    return mockBoard[x][y];
  }

  const randomDirection = () => {
    const randomNumber = Math.floor(Math.random() * 2);
    if (randomNumber === 0) {
      return 'H'
    } else {
      return 'V'
    }
  }

  const generateAdjascentCoords = (direction, coord, flatBoard, count) => {
    const initialIndex = coordIndexes(coord, mockBoard);
    const x = initialIndex[0];
    const y = initialIndex[1];
    let indexes = [initialIndex]

    if (direction === 'H') {
      for (let i = 1; i < count; i++) {
        indexes.push([x + i, y])
      }
    } else {
      for (let i = 1; i < count; i++) {
        indexes.push([x, y + i])
      }
    }

    const cleanIndexes = indexes.filter(
      (pair) => (pair[0] >= 0 && pair[1] < 10)
      && (pair[0] < 10 && pair[1] >= 0)
    )

    if (cleanIndexes.length < count) {
      return false;
    }

    const coords = cleanIndexes.map((pair) => {
      const X = pair[0]
      const Y = pair[1]
      return mockBoard[X][Y]
    })

    const cleanCoords = coords.filter(
      (pair) => (flatBoard.includes(pair[0]) === false)
      && (flatBoard.includes(pair[1]) === false)
    )

    if (cleanCoords.length === 2) {
      return cleanCoords;
    } else {
      return false;
    }
  }


  const randomCoordList = () => {
    let flatBoard = mockBoard.flat();
    let occupiedList = [];

    // Generate 4 single coords
    for (let i = 0; i < 4; i ++) {
      let validCoordFound = false;
      if (validCoordFound === false) {
        const randCoord = randomCoord();
        if (flatBoard.includes(randCoord)) {
          validCoordFound = true;
          occupiedList.push([randCoord]);
          const index = flatBoard.findIndex((element) => element === randCoord);
          flatBoard.splice(index, 1);
        }
      }
    }

    // Generate 3 double coords
    for (let i = 0; i < 3; i++) {
      let validCoordFound = false;

      if (validCoordFound === false) {
        const randCoord = randomCoord();

        if (flatBoard.includes(randCoord)) {
          const direction = randomDirection();
          const coordsList = generateAdjascentCoords(direction, randCoord, flatBoard, 2);

          if (coordsList) {
            validCoordFound = true;
            occupiedList.push([coordsList]);
            const indexes = coordsList.map(
              (coord) => flatBoard.findIndex(
                (element) => element === coord));
            indexes.forEach((index) => flatBoard.splice(index, 1));
          }
        } else {
          i--;
        }
      }
    }

    // Generate 2 triple coords
    // NOT WORKING
    for (let i = 0; i < 2; i++) {
      let validCoordFound = false;

      if (validCoordFound === false) {
        const randCoord = randomCoord();

        if (flatBoard.includes(randCoord)) {
          const direction = randomDirection();
          const coordsList = generateAdjascentCoords(direction, randCoord, flatBoard, 3);

          if (coordsList) {
            validCoordFound = true;
            occupiedList.push([coordsList]);
            const indexes = coordsList.map(
              (coord) => flatBoard.findIndex(
                (element) => element === coord));
            indexes.forEach((index) => flatBoard.splice(index, 1));
          }
        } else {
          i--;
        }
      }
    }
    return occupiedList;
  }

  return { mockBoard, coordIndexes, randomCoord, randomCoordList };
}
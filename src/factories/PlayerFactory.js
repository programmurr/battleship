var lodash = require('lodash');

function PlayerFactory() {
  let attacks = [];

  const humanAttack = (coord) => {
    if (attacks.includes(coord)) {
      throw new Error('You cannot attack the same cell twice!');
    } else {
      attacks.push(coord);
      return attacks;
    }
  }

  const computerAttack = () => {
    const height = lodash.range(1, 11);
    const length = lodash.range(65, 75).map((code) => String.fromCharCode(code));
    const mockBoard = height.map((num) => {
      return length.map((char) => {
        return `${char}${num}`;
      });
    });
    while (true) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      const attackCoord = mockBoard[x][y];
      if (attacks.includes(attackCoord)) {
        continue;
      } else {
        attacks.push(attackCoord);
        return attacks;
      }
    }
  }

  const locatedCoordIndexes = (coord, board) => {
    for (let i = 0; i < board.length; i++) {
      const row = board[i];
      if (row.includes(coord)) {
        const nestedIndex = row.findIndex((pos) => pos === coord);
        return [i, nestedIndex];
      }
    }
  }

  const getCoords = (xandYindexes, board) => {
    let coordsArray = [];
    const x = xandYindexes[0];
    const y = xandYindexes[1];
    try {
      const allRows = [board[x - 1], board[x], board[x + 1]];
      const rows = allRows.filter((row) => row !== undefined);
      rows.forEach((row) => {
        coordsArray.push(row[y - 1]);
        coordsArray.push(row[y]);
        coordsArray.push(row[y + 1]);
      })
    } catch (err) {
      console.log(err.message);
      console.log(coordsArray);
    }
    return coordsArray;
  }

  const cleanCoords = (coords, originalCoord) => {
    return coords.filter(
      (coord) => coord !== undefined 
        && coord !== originalCoord
        && !attacks.includes(coord)
    );
  }

  const calculateNextAttack = (coord, board) => {
    const xAndYIndexes = locatedCoordIndexes(coord, board);
    const coords = getCoords(xAndYIndexes, board);
    return cleanCoords(coords, coord);
  }

  return { humanAttack, computerAttack, attacks, calculateNextAttack }
}

export default PlayerFactory;
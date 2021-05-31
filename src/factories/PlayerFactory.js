import GameUtils from '../utils/GameUtils';

var lodash = require('lodash');

function PlayerFactory() {
  let attacks = [];
  let nextAttacks = [];

  const humanAttack = (coord) => {
    if (attacks.includes(coord)) {
      throw new Error('You cannot attack the same cell twice!');
    } else {
      attacks.push(coord);
      return attacks;
    }
  }

  const computerAttack = () => {
    if (nextAttacks.length > 0) {
      attacks.push(nextAttacks[nextAttacks.length - 1]);
      const newAttack = nextAttacks.splice(nextAttacks.length - 1, 1);
      return newAttack;
    } else {
      const mockBoard = GameUtils().mockBoard;
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
  }

  const getCoords = (xandYindexes, board) => {
    let coordsArray = [];
    const x = xandYindexes[0];
    const y = xandYindexes[1];
    try {
      const allRows = [board[x - 1], board[x], board[x + 1]];
      const rows = allRows.filter((row) => row !== undefined);
      rows.forEach((row) => {
        if (typeof row[y - 1] === 'string') {
          coordsArray.push(row[y - 1]);
        } else if (typeof row[y - 1] === 'object') {
          coordsArray.push(row[y - 1].hull[0]);
        }
        if (typeof row[y] === 'string') {
          coordsArray.push(row[y]);
        } else if (typeof row[y] === 'object') {
          coordsArray.push(row[y].hull[0]);
        }
        if (typeof row[y + 1] === 'string') {
          coordsArray.push(row[y + 1]);
        } else if (typeof row[y + 1] === 'object') {
          coordsArray.push(row[y + 1].hull[0]);
        }
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

  const calculateNextAttackRange = (position, board) => {
    const xAndYIndexes = GameUtils().coordIndexes(position, board);
    const coords = getCoords(xAndYIndexes, board);
    const finalCoords = cleanCoords(coords, position);
    finalCoords.forEach((coord) => {
      if (!nextAttacks.includes(coord)) {
        nextAttacks.push(coord)
      }
    });
    nextAttacks = lodash.difference(nextAttacks, attacks);
    return nextAttacks;
  }

  return { humanAttack, computerAttack, attacks, calculateNextAttackRange }
}

export default PlayerFactory;
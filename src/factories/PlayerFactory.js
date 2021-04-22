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

  return { humanAttack, computerAttack }
}

export default PlayerFactory;
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

  return { mockBoard, coordIndexes };
}
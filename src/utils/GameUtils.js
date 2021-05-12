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
      if (row.includes(coord)) {
        const nestedIndex = row.findIndex((pos) => pos === coord);
        return [i, nestedIndex];
      }
    }
  }

  return { mockBoard, coordIndexes };
}
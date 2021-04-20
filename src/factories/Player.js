// Players can take turns playing the game by attacking the enemy Gameboard
// The game is played against the computer, so make ‘computer’ players 
//  capable of making random plays. The AI does not have to be smart, but 
//  it should know whether or not a given move is legal. (i.e. it shouldn’t 
//  shoot the same coordinate twice).
var lodash = require('lodash');

function Player() {
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
    const xCoord = Math.floor(Math.random() * 10);
    const yCoord = Math.floor(Math.random() * 10);
    const attackCoord = mockBoard[xCoord][yCoord];
    attacks.push(attackCoord);
    return attacks;
  }

  return { humanAttack, computerAttack }
}

export default Player;
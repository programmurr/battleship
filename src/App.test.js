import Ship from './components/Ship';
import GameBoard from './components/GameBoard';

var lodash = require('lodash')

test('Ship constructs a ship from a length parameter', () => {
  const newShip = Ship(4);
  expect(newShip.hull).toEqual(["", "", "", ""]);
})

test('Ship.hit() takes a number and marks that position as hit', () => {
  const newShip = Ship(2);
  newShip.hit(1)
  expect(newShip.hull).toEqual(["", "X"]);
});

test('Ship.hit() can cumulatively add damage', () => {
  const newShip = Ship(4);
  newShip.hit(0);
  newShip.hit(3);
  newShip.hit(2);
  expect(newShip.hull).toEqual(["X", "", "X", "X"]);
});

test('Ship.isSunk() returns true if all positions are hit', () => {
  const newShip = Ship(4);
  newShip.hit(0);
  newShip.hit(1);
  newShip.hit(2);
  newShip.hit(3);
  expect(newShip.isSunk()).toBe(true);
});

test('Ship.isSunk() returns false if not all positions are hit', () => {
  const newShip = Ship(3);
  newShip.hit(1);
  newShip.hit(2);
  expect(newShip.isSunk()).toBe(false);
})

test('GameBoard.board is a board of "A-J" length and "1-10" height', () => {
  const height = lodash.range(1, 11);
  const length = lodash.range(65, 75).map((code) => String.fromCharCode(code));
  const testBoard = height.map((num) => {
    return length.map((char) => {
      return `${char}${num}`;
    });
  });
  expect(GameBoard().board).toEqual(testBoard);
})

test('GameBoard should be able to place one ship at specific coordinates', () => {
  const newBoard = GameBoard();
  expect(newBoard.placeShip(['A1', 'A2', 'A3', 'A4'])).toEqual({ '4': ['A1', 'A2', 'A3', 'A4']})
})

test('GameBoard should be able to place multiple ships at specific coordinates', () => {
  const newBoard = GameBoard();
  newBoard.placeShip(['A1', 'B1', 'C1', 'D1']);
  expect(newBoard.placeShip(['J9', 'J10'])).toEqual({ '4': ['A1', 'B1', 'C1', 'D1'], '2': ['J9', 'J10'] })
})

// GameBoards should have a receiveAttack() function that takes a pair of coordinates,
// determines whether or not the attack hit a ship and then sends the 'hit' function


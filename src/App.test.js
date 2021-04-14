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

test('Gameboard should call the Ship\'s \'hit\' function if an attack hits a ship', () => {
  const mockShip = (mockLength) => {
    const length = mockLength;
    const hit = jest.fn()
    return { length, hit }
  }

  const myShip = mockShip(4);
  const newBoard = GameBoard();
  newBoard.placeShip(['G5', 'G6', 'G7', 'G8'], myShip);
  newBoard.receiveAttack('G6');
  expect(myShip.hit).toHaveBeenCalled();
})

test('Gameboard should not call the Ship\'s \'hit\' function if an attack misses a ship', () => {
  const mockShip = (mockLength) => {
    const length = mockLength;
    const hit = jest.fn()
    return { length, hit }
  }

  const myShip = mockShip(3);
  const newBoard = GameBoard();
  newBoard.placeShip(['B7', 'B8', 'B9'], myShip);
  newBoard.receiveAttack('B6');
  expect(myShip.hit).not.toHaveBeenCalled();
})


// make a 'populateBoard' function
// it makes ships and calls placeShip()
// test it


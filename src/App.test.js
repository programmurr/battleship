import Ship from './factories/Ship';
import GameBoard from './factories/GameBoard';
import Player from './factories/Player';

var lodash = require('lodash');

describe('Ship', () => {
  it('constructs a ship from a length parameter', () => {
    const newShip = Ship(4);
    expect(newShip.hull).toEqual(["", "", "", ""]);
  });
  
  it('takes a number and marks that position as hit', () => {
    const newShip = Ship(2);
    newShip.hit(1)
    expect(newShip.hull).toEqual(["", "X"]);
  });
  
  it('can cumulatively add damage', () => {
    const newShip = Ship(4);
    newShip.hit(0);
    newShip.hit(3);
    newShip.hit(2);
    expect(newShip.hull).toEqual(["X", "", "X", "X"]);
  });
  
  it('returns true if all positions are hit', () => {
    const newShip = Ship(4);
    newShip.hit(0);
    newShip.hit(1);
    newShip.hit(2);
    newShip.hit(3);
    expect(newShip.isSunk()).toBe(true);
  });

  it('returns false if not all positions are hit', () => {
    const newShip = Ship(3);
    newShip.hit(1);
    newShip.hit(2);
    expect(newShip.isSunk()).toBe(false);
  });
})

describe('GameBoard', () => {
  it('is a board of "A-J" length and "1-10" height', () => {
    const height = lodash.range(1, 11);
    const length = lodash.range(65, 75).map((code) => String.fromCharCode(code));
    const itBoard = height.map((num) => {
      return length.map((char) => {
        return `${char}${num}`;
      });
    });
    expect(GameBoard().board).toEqual(itBoard);
  });
  
  it('should call the Ship\'s \'hit\' function if an attack hits a ship', () => {
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
  });

  it('should not call the Ship\'s \'hit\' function if an attack misses a ship', () => {
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
  });
  
  it('should call the correct Ship\'s \'hit\' function if there are multiple ships', () => {
    const mockShip = (mockLength) => {
      const length = mockLength;
      const hit = jest.fn()
      return { length, hit }
    }
  
    const myShip1 = mockShip(3);
    const myShip2 = mockShip(4);
    const newBoard = GameBoard();
    newBoard.placeShip(['B7', 'B8', 'B9', 'B10'], myShip1);
    newBoard.placeShip(['E6', 'F6', 'G6'], myShip2);
    newBoard.receiveAttack('E6');
    expect(myShip2.hit).toHaveBeenCalled();
  });
  
  it('should not call the Ship\'s \'hit\' function if an attack misses multiple ships', () => {
    const mockShip = (mockLength) => {
      const length = mockLength;
      const hit = jest.fn()
      return { length, hit }
    }
  
    const myShip1 = mockShip(3);
    const myShip2 = mockShip(4);
    const newBoard = GameBoard();
    newBoard.placeShip(['J1', 'J2', 'J3', 'J4'], myShip1);
    newBoard.placeShip(['E2', 'E3', 'E4'], myShip2);
    newBoard.receiveAttack('E6');
    expect(myShip2.hit).not.toHaveBeenCalled();
  });
  
  it('#missedAttacks is an array of coordinates showing attacks that missed ships', () => {
    const mockShip = (mockLength) => {
      const length = mockLength;
      const hit = jest.fn()
      return { length, hit }
    }
  
    const myShip1 = mockShip(4);
    const myShip2 = mockShip(2);
    const newBoard = GameBoard();
    newBoard.placeShip(['J1', 'J2', 'J3', 'J4'], myShip1);
    newBoard.placeShip(['A1', 'B1'], myShip2);
    newBoard.receiveAttack('J6');
    newBoard.receiveAttack('A1');
    newBoard.receiveAttack('J5');
    expect(newBoard.missedAttacks).toEqual(expect.arrayContaining(['J5', 'J6']));
  });
  
  it('#missedAttacks is an array of coordinates not including attacks that hit ships', () => {
    const mockShip = (mockLength) => {
      const length = mockLength;
      const hit = jest.fn()
      return { length, hit }
    }
  
    const myShip1 = mockShip(3);
    const myShip2 = mockShip(1);
    const newBoard = GameBoard();
    newBoard.placeShip(['J10'], myShip1);
    newBoard.placeShip(['A1', 'B1', 'C1'], myShip2);
    newBoard.receiveAttack('J10');
    newBoard.receiveAttack('A1');
    newBoard.receiveAttack('B1');
    expect(newBoard.missedAttacks).toEqual(expect.arrayContaining([]));
  });
  
  it('#allShipsSunk returns true if all ships have sunk', () => {
    const mockShip = (mockLength) => {
      const length = mockLength;
      const isSunk = jest.fn().mockReturnValue(true);
      return { length, isSunk }
    }
  
    const newBoard = GameBoard();
    newBoard.placeShip(['A1', 'A2', 'A3', 'A4'], mockShip(4));
    newBoard.placeShip(['B1', 'B2', 'B3'], mockShip(3));
    newBoard.placeShip(['B4', 'B5', 'B6'], mockShip(3));
    newBoard.placeShip(['C2', 'D2'], mockShip(2));
    newBoard.placeShip(['E2', 'F2'], mockShip(2));
    newBoard.placeShip(['G2', 'H2'], mockShip(2));
    newBoard.placeShip(['J6'], mockShip(1));
    newBoard.placeShip(['J7'], mockShip(1));
    newBoard.placeShip(['J8'], mockShip(1));
    newBoard.placeShip(['J9'], mockShip(1));
    expect(newBoard.allShipsSunk()).toBe(true);
  });
  
  it('#allShipsSunk returns false if all ships have not sunk', () => {
    const sunkShip = (mockLength) => {
      const length = mockLength;
      const isSunk = jest.fn().mockReturnValue(true);
      return { length, isSunk }
    }
  
    const aliveShip = (mockLength) => {
      const length = mockLength;
      const isSunk = jest.fn().mockReturnValue(false);
      return { length, isSunk }
    }
  
    const newBoard = GameBoard();
    newBoard.placeShip(['A1', 'A2', 'A3', 'A4'], sunkShip(4));
    newBoard.placeShip(['B1', 'B2', 'B3'], sunkShip(3));
    newBoard.placeShip(['B4', 'B5', 'B6'], sunkShip(3));
    newBoard.placeShip(['C2', 'D2'], sunkShip(2));
    newBoard.placeShip(['E2', 'F2'], sunkShip(2));
    newBoard.placeShip(['G2', 'H2'], aliveShip(2));
    newBoard.placeShip(['J6'], aliveShip(1));
    newBoard.placeShip(['J7'], aliveShip(1));
    newBoard.placeShip(['J8'], sunkShip(1));
    newBoard.placeShip(['J9'], aliveShip(1));
    expect(newBoard.allShipsSunk()).toBe(false);
  });
})

describe('Player', () => {
  it('#humanAttack receives an attack coordinate', () => {
    const player = Player();
    expect(player.humanAttack('D2')).toEqual(['D2']);
  })
  
  it('#humanAttack can handle multiple attacks', () => {
    const player = Player();
    player.humanAttack('J8')
    player.humanAttack('A1')
    expect(player.humanAttack('B2')).toEqual(expect.arrayContaining(['A1', 'B2', 'J8']));
  })
  
  it('#humanAttack errors if the same cell is attacked twice', () => {
    const player = Player();
    player.humanAttack('H4')
    expect(() => player.humanAttack('H4')).toThrow('You cannot attack the same cell twice!');
  })
  
  it('#computerAttack randomly attacks a cell on the board', () => {
    const computer = Player();
    expect(computer.computerAttack()).toHaveLength(1);
  })
  
  it('#computerAttack randomly attacks multiple cells', () => {
    const computer = Player();
    computer.computerAttack();
    computer.computerAttack();
    expect(computer.computerAttack()).toHaveLength(3);
  })
  
  it('#computerAttack does not attack the same cell twice', () => {
    const computer = Player();
    let attackedCells = [];
    for (let i = 0; i < 100; i++) {
      const attackedList = computer.computerAttack()
      attackedCells.push(attackedList[attackedList.length - 1]);
    }
    let uniqueCells = [...new Set(attackedCells)];
    expect(uniqueCells.length).toBe(attackedCells.length);
  })
})

















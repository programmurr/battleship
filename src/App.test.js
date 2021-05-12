import ShipFactory from './factories/ShipFactory';
import GameBoardFactory from './factories/GameBoardFactory';
import PlayerFactory from './factories/PlayerFactory';

var lodash = require('lodash');

describe('ShipFactory', () => {
  it('constructs a ship from a length parameter', () => {
    const newShip = ShipFactory(4);
    expect(newShip.hull).toEqual(["", "", "", ""]);
  });
  
  it('takes a number and marks that position as hit', () => {
    const newShip = ShipFactory(2);
    newShip.hit(1)
    expect(newShip.hull).toEqual(["", "X"]);
  });
  
  it('can cumulatively add damage', () => {
    const newShip = ShipFactory(4);
    newShip.hit(0);
    newShip.hit(3);
    newShip.hit(2);
    expect(newShip.hull).toEqual(["X", "", "X", "X"]);
  });
  
  it('returns true if all positions are hit', () => {
    const newShip = ShipFactory(4);
    newShip.hit(0);
    newShip.hit(1);
    newShip.hit(2);
    newShip.hit(3);
    expect(newShip.isSunk()).toBe(true);
  });

  it('returns false if not all positions are hit', () => {
    const newShip = ShipFactory(3);
    newShip.hit(1);
    newShip.hit(2);
    expect(newShip.isSunk()).toBe(false);
  });

  it('has a default orientation property of "H"', () => {
    const newShip = ShipFactory(2);
    expect(newShip.orientation).toBe('H');
  });

  it('can set its orientation to "V"', () => {
    const newShip = ShipFactory(3, 'V');
    expect(newShip.orientation).toBe('V');
  });

  it('can set its orientation to "H"', () => {
    const newShip = ShipFactory(4, 'H');
    expect(newShip.orientation).toBe('H');
  });

  it('can calculate its horizontal placement when placed on the board (length 1)', () => {
    const newShip = ShipFactory(1, 'H');
    newShip.placement('A1');
    expect(newShip.hull).toEqual(['A1']);
  })

  it('can calculate its horizontal placement when placed on the board (length 2)', () => {
    const newShip = ShipFactory(2, 'H');
    newShip.placement('C1');
    expect(newShip.hull).toEqual(['C1', 'D1']);
  })

  it('can calculate its horizontal placement when placed on the board (length 3)', () => {
    const newShip = ShipFactory(3, 'H');
    newShip.placement('E7');
    expect(newShip.hull).toEqual(['E7', 'F7', 'G7']);
  })

  it('can calculate its horizontal placement when placed on the board (length 4)', () => {
    const newShip = ShipFactory(4, 'H');
    newShip.placement('A10');
    expect(newShip.hull).toEqual(['A10', 'B10', 'C10', 'D10']);
  })

  it('throws an error if the player tries to place the ship beyond the range of the board', () => {
    const newShip = ShipFactory(4, 'H');
    expect(() => newShip.placement('H7')).toThrow('Ship exceeds the range of the board');
  })

  it('can calculate its vertical placement when placed on the board (length 1)', () => {
    const newShip = ShipFactory(1, 'H');
    newShip.placement('A1');
    expect(newShip.hull).toEqual(['A1']);
  })

  it('can calculate its vertical placement when placed on the board (length 2)', () => {
    const newShip = ShipFactory(2, 'V');
    newShip.placement('I3');
    expect(newShip.hull).toEqual(['I3', 'I4']);
  })

  it('can calculate its vertical placement when placed on the board (length 3)', () => {
    const newShip = ShipFactory(3, 'V');
    newShip.placement('C5');
    expect(newShip.hull).toEqual(['C5', 'C6', 'C7']);
  })

  it('can calculate its vertical placement when placed on the board (length 4)', () => {
    const newShip = ShipFactory(4, 'V');
    newShip.placement('F7');
    expect(newShip.hull).toEqual(['F7', 'F8', 'F9', 'F10']);
  })

  it('throws error if the player tries to place a vertical ship beyond the range of the board', () => {
    const newShip = ShipFactory(4, 'V');
    expect(() => newShip.placement('F10')).toThrow('Ship exceeds the range of the board');
  })
})

describe('GameBoardFactory', () => {
  it('is a board of "A-J" length and "1-10" height', () => {
    const height = lodash.range(1, 11);
    const length = lodash.range(65, 75).map((code) => String.fromCharCode(code));
    const mockBoard = height.map((num) => {
      return length.map((char) => {
        return `${char}${num}`;
      });
    });
    expect(GameBoardFactory().board).toEqual(mockBoard);
  });
  
  it('should call the Ship\'s \'hit\' function if an attack hits a ship', () => {
    const mockShip = (mockLength) => {
      const length = mockLength;
      const hit = jest.fn()
      return { length, hit }
    }
  
    const myShip = mockShip(4);
    const newBoard = GameBoardFactory();
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
    const newBoard = GameBoardFactory();
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
    const newBoard = GameBoardFactory();
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
    const newBoard = GameBoardFactory();
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
    const newBoard = GameBoardFactory();
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
    const newBoard = GameBoardFactory();
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
  
    const newBoard = GameBoardFactory();
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
  
    const newBoard = GameBoardFactory();
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

  it('#successfulAttacks is an array of successful attacks against the board', () => {
    const mockShip = (mockLength) => {
      const length = mockLength;
      const hit = jest.fn()
      return { length, hit }
    }
    const myShip = mockShip(4);
    const newBoard = GameBoardFactory();
    newBoard.placeShip(['A1', 'A2', 'A3', 'A4'], myShip);
    newBoard.receiveAttack('A1');
    newBoard.receiveAttack('H9');
    newBoard.receiveAttack('A2');
    expect(newBoard.successfulAttacks).toEqual(['A1', 'A2']);
  })
})

describe('PlayerFactory', () => {
  it('#humanAttack receives an attack coordinate', () => {
    const player = PlayerFactory();
    expect(player.humanAttack('D2')).toEqual(['D2']);
  })
  
  it('#humanAttack can handle multiple attacks', () => {
    const player = PlayerFactory();
    player.humanAttack('J8')
    player.humanAttack('A1')
    expect(player.humanAttack('B2')).toEqual(expect.arrayContaining(['A1', 'B2', 'J8']));
  })
  
  it('#humanAttack errors if the same cell is attacked twice', () => {
    const player = PlayerFactory();
    player.humanAttack('H4')
    expect(() => player.humanAttack('H4')).toThrow('You cannot attack the same cell twice!');
  })
  
  it('#computerAttack randomly attacks a cell on the board', () => {
    const computer = PlayerFactory();
    expect(computer.computerAttack()).toHaveLength(1);
  })
  
  it('#computerAttack randomly attacks multiple cells', () => {
    const computer = PlayerFactory();
    computer.computerAttack();
    computer.computerAttack();
    expect(computer.computerAttack()).toHaveLength(3);
  })
  
  it('#computerAttack does not attack the same cell twice', () => {
    const computer = PlayerFactory();
    let attackedCells = [];
    for (let i = 0; i < 100; i++) {
      const attackedList = computer.computerAttack()
      attackedCells.push(attackedList[attackedList.length - 1]);
    }
    let uniqueCells = [...new Set(attackedCells)];
    expect(uniqueCells.length).toBe(attackedCells.length);
  })

  it('#calculateNextAttackRange calculates coordinates adjascent to a successful hit', () => {
    const player = PlayerFactory();
    const height = lodash.range(1, 11);
    const length = lodash.range(65, 75).map((code) => String.fromCharCode(code));
    const mockBoard = height.map((num) => {
      return length.map((char) => {
        return `${char}${num}`;
      });
    });
    expect(player.calculateNextAttackRange('C3', mockBoard)).toEqual(
      ['B2', 'C2', 'D2', 'B3', 'D3', 'B4', 'C4', 'D4']
    )
  })

  it('#calculateNextAttackRange does not calculate coordinates beyond the range of the board', () => {
    const player = PlayerFactory();
    const height = lodash.range(1, 11);
    const length = lodash.range(65, 75).map((code) => String.fromCharCode(code));
    const mockBoard = height.map((num) => {
      return length.map((char) => {
        return `${char}${num}`;
      });
    });
    expect(player.calculateNextAttackRange('J5', mockBoard)).toEqual(
      ['I4', 'J4', 'I5', 'I6', 'J6']
    )
  })

  it('#calculateNextAttackRange does not include attacks already made by the player', () => {
    const player = PlayerFactory();
    const height = lodash.range(1, 11);
    const length = lodash.range(65, 75).map((code) => String.fromCharCode(code));
    const mockBoard = height.map((num) => {
      return length.map((char) => {
        return `${char}${num}`;
      });
    });
    player.attacks.push('E9');
    player.attacks.push('F9');
    player.attacks.push('F10');
    expect(player.calculateNextAttackRange('F10', mockBoard)).toEqual(
      ['G9', 'E10', 'G10']
    )
  })

  it('#calculateNextAttackRange concatenates attacks', () => {
    const player = PlayerFactory();
    const height = lodash.range(1, 11);
    const length = lodash.range(65, 75).map((code) => String.fromCharCode(code));
    const mockBoard = height.map((num) => {
      return length.map((char) => {
        return `${char}${num}`;
      });
    });

    player.attacks.push('A1');
    player.attacks.push('A2');
    player.attacks.push('B2');
    player.calculateNextAttackRange('B2', mockBoard);
    player.attacks.push('C2');
    player.attacks.push('B3');
    expect(player.calculateNextAttackRange('B3', mockBoard)).toEqual(
      ['B1', 'C1', 'A3', 'C3', 'A4', 'B4', 'C4']
    )
  })
})

















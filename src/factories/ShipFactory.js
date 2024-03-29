import GameUtils from '../utils/GameUtils';
import Ship4 from '../img/ship4.png';
import Ship3 from '../img/ship3.png';
import Ship2 from '../img/ship2.png';
import Ship1 from '../img/ship1.png';


function ShipFactory(length, direction = 'H') {
  const shipImages = [Ship1, Ship2, Ship3, Ship4];
  const orientation = direction;
  let hitCounter = 0;

  let hull = Array.from({ length: length }).map(() => "");

  const src = shipImages[hull.length - 1];

  const placement = (coord, direction) => {
    const board = GameUtils().mockBoard;
    const indexes = GameUtils().coordIndexes(coord, board);
    let x = indexes[0];
    let y = indexes[1];

    hull[0] = coord;

    if (hull.length > 1 && direction === 'H') {
      for (let i = 1; i < hull.length; i++) {
        const nextCell = board[x][y + i];
        hull[i] = nextCell;
      }
    } else {
      try {
        for (let i = 1; i < hull.length; i++) {
          const nextCell = board[x + i][y];
          hull[i] = nextCell;
        }
      } catch (e) {
        throw new Error('Ship exceeds the range of the board');
      }
    }

    if (hull.includes(undefined)) {
      throw new Error('Ship exceeds the range of the board');
    }
  }

  const hit = () => {
    hitCounter++;
    return hitCounter;
  }

  const isSunk = () => {
    if (hitCounter === hull.length) {
      return true;
    }
    return false;
  }

  return { hull, hit, isSunk, orientation, placement, src, hitCounter };
}

export default ShipFactory;
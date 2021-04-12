function Ship(coOrdinates) {

  const position = coOrdinates;
  const length = coOrdinates.length;
  const damageMap = {};

  const hit = (target) => {
    if (position.includes(target)) {
      damageMap[target] = true;
      return true;
    }
    return false;
  }

  const isSunk = () => {
    if (Object.keys(damageMap).length === length) {
      return true;
    }
    return false;
  }

  return { length, hit, isSunk };
}

export default Ship;
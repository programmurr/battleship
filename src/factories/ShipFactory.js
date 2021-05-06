function ShipFactory(length, direction = 'H') {

  const orientation = direction;

  const hull = Array.from({ length: length }).map(() => "");

  const hit = (index) => {
    hull[index] = "X";
  }

  const isSunk = () => {
    return hull.every((compartment) => compartment === "X");
  }

  return { hull, hit, isSunk, orientation };
}

export default ShipFactory;
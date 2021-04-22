function ShipFactory(length) {

  const hull = Array.from({ length: length }).map(() => "");

  const hit = (index) => {
    hull[index] = "X";
  }

  const isSunk = () => {
    return hull.every((compartment) => compartment === "X");
  }

  return { hull, hit, isSunk };
}

export default ShipFactory;
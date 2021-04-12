import { render, screen } from '@testing-library/react';
import App from './App';
import Ship from './components/Ship';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('Ship constructs a ship from array of co-ords', () => {
  const newShip = Ship(['A3', 'A4', 'A5', 'A6']);
  expect(newShip.length).toBe(4);
})

test('Ship.hit() takes a number and marks that position as hit', () => {
  const newShip = Ship(['A3', 'A4', 'A5', 'A6']);
  expect(newShip.hit('A3')).toEqual(true);
});

test('Ship.hit() does not register damage if the hit misses', () => {
  const newShip = Ship(['B3', 'B4', 'B5', 'B6']);
  expect(newShip.hit('C3')).toEqual(false);
});

test('Ship.isSunk() returns true if all positions are hit', () => {
  const newShip = Ship(['B3', 'B4', 'B5', 'B6']);
  newShip.hit('B3');
  newShip.hit('B6');
  newShip.hit('B5');
  newShip.hit('B4');
  expect(newShip.isSunk()).toBe(true);
});

test('Ship.isSunk() returns false if not all positions are hit', () => {
  const newShip = Ship(['G10', 'H10', 'I10']);
  newShip.hit('G10');
  newShip.hit('I10');
  expect(newShip.isSunk()).toBe(false);
})

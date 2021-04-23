import './App.css';
import Boards from './components/Boards';

function App() {

  const handleBoardClick = (coord) => {
    console.log(coord);
  }
  return (
    <div className="App">
      <div className="Header">
        <h1>Battleship</h1>
      </div>
      <Boards 
        onClick={handleBoardClick}
      />
    </div>
  );
}

export default App;

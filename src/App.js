import './App.css';
import Boards from './components/Boards';

function App() {
  return (
    <div className="App">
      <div className="Header">
        <h1>Battleship</h1>
      </div>
      <Boards />
    </div>
  );
}

export default App;

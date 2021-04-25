function Boards(props) {

  const { playerBoard, computerBoard } = props;

  const handleClick = (event) => {
    props.handleClick(event.target.textContent)
  }

  return (
    <div className="Boards">
      <h2 className="PlayerBoardHeader">Player Board</h2>
      <div className="PlayerBoard">
        {playerBoard.board.map((row) => (
          row.map((cell) => (
            <div
              key={cell} 
              className="PlayerCell"
              >
              {cell}
            </div>
          ))
        ))}
      </div>
      <h2 className="ComputerBoardHeader">Computer Board</h2>
      <div className="ComputerBoard">
        {computerBoard.board.map((row) => (
          row.map((cell) => (
            computerBoard.missedAttacks.includes(cell) ? 
              <div 
                key={cell} 
                className="ComputerCell"
                onClick={handleClick}
                >
                O
              </div>
            : <div 
                key={cell} 
                className="ComputerCell"
                onClick={handleClick}
                >
                {cell}
              </div>
          ))
        ))}
      </div>
    </div>
  )
}

export default Boards;
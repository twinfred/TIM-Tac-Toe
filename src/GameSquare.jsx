import './GameSquare.scss';

function GameSquare({ square, handleClick, rowIndex, columnIndex }) {
  return (
    <button onClick={() => handleClick([rowIndex, columnIndex])}>
      {
        !square ? '' : (square === 1 ? 'X' : 'O')
      }
    </button>
  )
}

export default GameSquare;
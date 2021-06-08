import GameSquare from './GameSquare';

function GameRow({ row, ...props }) {
  return (
    <div>
      {
        row.map((square, index) => (
          <GameSquare square={square} columnIndex={index} key={index} {...props} />
        ))
      }
    </div>
  )
}

export default GameRow;
import { useState, useEffect } from 'react';
import GameRow from './GameRow';

function App() {
  const [gameBoard, updateGameBoard] = useState([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
  const [winner, updateWinner] = useState();
  const [turnCounter, updateTurnCounter] = useState(1);
  const [currentPlayer, updateCurrentPlayer] = useState(1);

  useEffect(() => {
    if (winner) {
      alert(`Congrats player ${winner}, you're the winner!`);
      updateGameBoard([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
      updateWinner(null);
      updateTurnCounter(1);
      updateCurrentPlayer(1);
    }
  }, [winner]);

  const isWinner = (location) => {
    const winConditions = {
      '0,0': [[[0,1],[0,2]], [[1,0],[2,0]], [[1,1],[2,2]]],
      '0,1': [[[0,0],[0,2]], [[1,1],[2,1]]],
      '0,2': [[[0,0],[0,1]], [[1,2],[2,2]], [[1,1],[2,0]]],
      '1,0': [[[1,1],[1,2]], [[0,0],[2,0]]],
      '1,1': [[[0,1],[2,1]], [[1,0],[1,2]], [[0,0],[2,2]], [[0,2],[2,0]]],
      '1,2': [[[1,0],[1,1]], [[0,2],[2,2]]],
      '2,0': [[[0,0],[1,0]], [[2,1],[2,2]], [[1,1],[0,2]]],
      '2,1': [[[0,1],[1,1]], [[2,0],[2,2]]],
      '2,2': [[[0,2],[1,2]], [[2,0],[2,1]], [[0,0],[1,1]]]
    };

    let winner = false;
    
    winConditions[location].forEach(winLocation => {
      const isWinner = winLocation.every(item => {
        return gameBoard[item[0]][item[1]] === currentPlayer;
      });

      if (isWinner) {
        winner = true;
        return;
      }
    });

    return winner;
  }

  const handleGameSquareClick = (location) => {
    gameBoard[location[0]][location[1]] = currentPlayer;
    updateGameBoard([...gameBoard]);

    if (turnCounter > 4) {
      const weHaveAWinner = isWinner(location);

      console.log('do we have a winner?', weHaveAWinner);
      if (weHaveAWinner) {
        console.log('updating winner')
        updateWinner(currentPlayer);
      }
    }

    updateCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    updateTurnCounter(turnCounter + 1);
  }

  return (
    <div className="App">
      <h1>TIM Tac Toe</h1>
      <h2>Player {currentPlayer}'s turn</h2>
      {
        gameBoard.map((row, index) => (
          <GameRow row={row} rowIndex={index} key={index} handleClick={handleGameSquareClick}/>
        ))
      }
    </div>
  );
}

export default App;

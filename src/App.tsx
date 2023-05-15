import { useState, useRef, useEffect } from 'react'
import { generateSudokuBoard } from './utils/generateBoard'
import { checkSolved } from './utils/checkSolved'
import { nullifyValues } from './utils/nullifyValues'
import './App.css'
import { Title } from './components/title'

function App() {
  const boardOriginal = useRef<Board>(generateSudokuBoard());
  const [board, setBoard] = useState<Board>([]);

  useEffect(() => {
    setBoard(
      () => {
        const newBoard = JSON.parse(JSON.stringify(boardOriginal.current)) as Board;
        nullifyValues(newBoard);
        return newBoard;
      }
    );
  }, [boardOriginal]);


  if (checkSolved(board, boardOriginal.current)) {
    alert('You solved the puzzle!');
  }

  return (
    <>
      <Title />
      <div className="board">
        {board.map((square, i) => (
          <div className="square" key={i}>
            {square.map((num, j) => (
              <div className="cell" key={j}>
                <input
                  type="number"
                  min="1"
                  max="9"
                  className="input"
                  value={num === 0 ? '' : num}
                  onChange={(e) => {
                    const newBoard = JSON.parse(JSON.stringify(board));
                    newBoard[i][j] = parseInt(e.target.value);
                    setBoard(newBoard);
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

export default App

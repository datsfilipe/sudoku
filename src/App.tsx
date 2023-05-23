import { useState, useRef, useEffect } from 'react'
import { generateSudokuBoard } from './utils/generateBoard'
import { checkSolved } from './utils/checkSolved'
import { nullifyValues } from './utils/nullifyValues'
import './globals.css'
import { Title } from './components/title'

function App() {
  const [initialBoard, setInitialBoard] = useState<Board>([]);
  const boardOriginal = useRef<Board>(generateSudokuBoard());
  const [board, setBoard] = useState<Board>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const newBoard = JSON.parse(JSON.stringify(boardOriginal.current)) as Board;
    nullifyValues(newBoard);
    setInitialBoard(newBoard);
    setBoard(newBoard);
  }, [boardOriginal]);

  if (checkSolved(board, boardOriginal.current)) {
    alert('You solved the puzzle!');
  }

  return (
    <main>
      <aside
        className="sidebar"
        style={{ transform: open ? 'translateX(0)' : 'translateX(-100%)' }}
      >
        <div className="instructions">
          <h2>Instructions</h2>
          <p>
            Fill in the grid so that every row, every column, and every 3x3 box contains the digits 1 through 9.
          </p>

          <h2>How to Play</h2>
          <p>
            Click on a cell and enter a number using your keyboard.
          </p>
          <h2>Actions</h2>
          <div className="actions">
            <button
              className='button'
              onClick={() => {
                const newBoard = JSON.parse(JSON.stringify(boardOriginal.current)) as Board;
                nullifyValues(newBoard);
                setInitialBoard(newBoard);
                setBoard(newBoard);
              }}
            >
              Reset
            </button>
            <button
              className='button'
              onClick={() => {
                const newBoard = JSON.parse(JSON.stringify(boardOriginal.current)) as Board;
                setBoard(newBoard);
              }}
            >
              Solve
            </button>
          </div>
        </div>
      </aside>
      <button
        className="sidebar-button"
        onClick={() => setOpen(!open)}
      >
        {open ? '⬅' : '➡'}
      </button>
      <div className="content">
        <Title />
        <div className="board">
          {board.map((square, i) => (
            <div className="square" key={i}>
              {square.map((num, j) => (
                <div key={j} className={`cell ${initialBoard?.[i][j] ? 'filled' : ''}`}>
                  <input
                    type="number"
                    min="1"
                    max="9"
                    disabled={initialBoard?.[i][j] ? true : false}
                    className="input"
                    value={num === 0 ? '' : num}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (value < 1 || value > 9) {
                        return;
                      }

                      const newBoard = JSON.parse(JSON.stringify(board));
                      newBoard[i][j] = value;
                      setBoard(newBoard);
                    }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default App

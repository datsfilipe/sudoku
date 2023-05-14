import { useState, useEffect } from 'react'
import './App.css'

type Board = number[][];

function generateSudokuBoard(): Board {
  const board: Board = [];

  for (let i = 0; i < 9; i++) {
    board[i] = [];
    for (let j = 0; j < 9; j++) {
      board[i][j] = 0;
    }
  }

  fillBoard(board, 0, 0);

  return board;
}

function fillBoard(board: Board, row: number, col: number): boolean {
  if (row === 9) {
    return true;
  }

  let nextRow = row;
  let nextCol = col + 1;
  if (nextCol === 9) {
    nextRow += 1;
    nextCol = 0;
  }

  const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  for (const num of numbers) {
    if (isValid(board, row, col, num)) {
      board[row][col] = num;
      if (fillBoard(board, nextRow, nextCol)) {
        return true;
      }
    }
  }

  board[row][col] = 0;
  return false;
}

function isValid(board: Board, row: number, col: number, num: number): boolean {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num) {
      return false;
    }
  }

  for (let i = 0; i < 9; i++) {
    if (board[i][col] === num) {
      return false;
    }
  }

  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      if (board[i][j] === num) {
        return false;
      }
    }
  }

  return true;
}

function shuffle(array: number[]): number[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function checkSolved(board: Board, originalBoard: Board): boolean {
  if (board.length !== 9 || originalBoard.length !== 9) {
    return false;
  }

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] !== originalBoard[i][j]) {
        return false;
      }
    }
  }
  return true;
}

function App() {
  const [boardOriginal, _] = useState<Board>(generateSudokuBoard());
  const [board, setBoard] = useState<Board>([]);

  useEffect(() => {
    setBoard(
      () => {
        const newBoard = JSON.parse(JSON.stringify(boardOriginal));
        nullifyValues(newBoard);
        return newBoard;
      }
    );
  }, [boardOriginal]);

  const nullifyValues = (board: Board) => {
    const cellsToNullify = 40;
    let cellsNullified = 0;
    while (cellsNullified < cellsToNullify) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      if (board[row][col] !== 0) {
        board[row][col] = 0;
        cellsNullified++;
      }
    }
  };

  if (checkSolved(board, boardOriginal)) {
    alert('You solved the puzzle!');
  }

  return (
    <>
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

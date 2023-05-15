import { fillBoard } from "./fillBoard"

export function generateSudokuBoard(): Board {
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

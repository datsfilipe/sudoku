import { isValid } from "./isValid"
import { shuffle } from "./shuffle"

export function fillBoard(board: Board, row: number, col: number): boolean {
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

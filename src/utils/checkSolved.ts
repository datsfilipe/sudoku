export function checkSolved(board: Board, originalBoard: Board): boolean {
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

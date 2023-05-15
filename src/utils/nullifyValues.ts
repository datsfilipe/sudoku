export const nullifyValues = (board: Board) => {
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

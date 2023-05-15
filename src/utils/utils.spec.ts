import { generateSudokuBoard } from "./generateBoard";
import { fillBoard } from "./fillBoard";
import { checkSolved } from "./checkSolved";
import { shuffle } from "./shuffle";
import { nullifyValues } from "./nullifyValues";
import { isValid } from "./isValid";

describe('Utils functions', () => {
  it('should shuffle an array', () => {
    const array = [1, 2, 3, 4, 5];
    const arrayCopy = [...array];
    shuffle(array);
    expect(array).toHaveLength(5);
    expect(array).not.toEqual(arrayCopy);
  })

  it('should generate a sudoku board', () => {
    const board = generateSudokuBoard();
    expect(board).toHaveLength(9);
    expect(board[0]).toHaveLength(9);
  })

  it('should tell if number is valid in cell', () => {
    const board = generateSudokuBoard();
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9 ; j++) {
        board[i][j] = 0;
      }
    }

    expect(isValid(board, 0, 0, 1)).toBeTruthy();
    expect(isValid(board, 0, 0, 0)).toBeFalsy();
  })

  it('should fill a board', () => {
    const board = generateSudokuBoard();
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9 ; j++) {
        fillBoard(board, i, j);
      }
    }
    expect(board).toHaveLength(9);
    expect(board[0]).toHaveLength(9);
  })

  it('should nullify values', () => {
    const board = generateSudokuBoard();
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9 ; j++) {
        board[i][j] = 1;
      }
    }
    const boardCopy = JSON.parse(JSON.stringify(board));

    nullifyValues(board);
    expect(board).toHaveLength(9);
    expect(board[0]).toHaveLength(9);
    expect(board).not.toEqual(boardCopy);
  })

  it('should check if board is solved', () => {
    const board = generateSudokuBoard();
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9 ; j++) {
        board[i][j] = 1;
      }
    }
    const boardCopy = JSON.parse(JSON.stringify(board));
    expect(checkSolved(boardCopy, board)).toBeTruthy();

    boardCopy[0][0] = 0;
    expect(checkSolved(boardCopy, board)).toBeFalsy();
  })
});

import { createSlice, createSelector } from "@reduxjs/toolkit";

// Helper functions
const checkRow = (board, rowIndex) => {
  const row = board[rowIndex].filter((cell) => cell !== 0);
  const uniqueNumbers = new Set(row);
  return uniqueNumbers.size === row.length;
};

const checkColumn = (board, colIndex) => {
  const col = board.map((row) => row[colIndex]).filter((cell) => cell !== 0);
  const uniqueNumbers = new Set(col);
  return uniqueNumbers.size === col.length;
};

const checkBox = (board, rowIndex, colIndex) => {
  const startRow = Math.floor(rowIndex / 3) * 3;
  const startCol = Math.floor(colIndex / 3) * 3;
  const boxValues = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const value = board[startRow + i][startCol + j];
      if (value !== 0) boxValues.push(value);
    }
  }
  const uniqueValues = new Set(boxValues);
  return uniqueValues.size === boxValues.length;
};

const checkAllRows = (board) =>
  board.every((_, rowIndex) => checkRow(board, rowIndex));

const checkAllColumns = (board) =>
  board[0].every((_, colIndex) => checkColumn(board, colIndex));

const checkAllBoxes = (board) => {
  for (let rowIndex = 0; rowIndex < 9; rowIndex += 3) {
    for (let colIndex = 0; colIndex < 9; colIndex += 3) {
      if (!checkBox(board, rowIndex, colIndex)) {
        return false;
      }
    }
  }
  return true;
};

const isBoardComplete = (board) =>
  board.every((row) => row.every((cell) => cell !== 0));

const isWinningBoard = (board) =>
  isBoardComplete(board) &&
  checkAllRows(board) &&
  checkAllColumns(board) &&
  checkAllBoxes(board);

const myBoard = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    gameStarted: false,
    board: myBoard,
    validation: Array(9)
      .fill()
      .map(() => Array(9).fill(true)),
    steps: [],
    isWinning: false,
  },

  reducers: {
    startGame(state, action) {
      state.gameStarted = action.payload;
    },
    updateBoard(state, action) {
      const { rowIndex, colIndex, value } = action.payload;
      state.board[rowIndex][colIndex] = value;
      const isValid =
        checkRow(state.board, rowIndex) &&
        checkColumn(state.board, colIndex) &&
        checkBox(state.board, rowIndex, colIndex);
      state.validation[rowIndex][colIndex] = isValid;

      state.isWinning = isWinningBoard(state.board);
    },
    resetGame(state) {
      state.board = myBoard;
      state.validation = Array(9)
        .fill()
        .map(() => Array(9).fill(true));
      state.steps = [];
      state.isWinning = false;
    },
    addSteps(state, action) {
      state.steps.push(action.payload);
    },
    undoStep(state) {
      if (state.steps.length > 0) {
        const lastStep = state.steps.pop();
        state.board[lastStep.rowIndex][lastStep.colIndex] = 0;
        state.validation[lastStep.rowIndex][lastStep.colIndex] = true;
        state.isWinning = isWinningBoard(state.board);
      }
    },
  },
});

export const { startGame, updateBoard, resetGame, addSteps, undoStep } =
  filterSlice.actions;
export default filterSlice.reducer;

export const selectBoard = (state) => state.filter.board;

export const countNumbers = createSelector([selectBoard], (board) => {
  const counts = {};
  board.forEach((row) => {
    row.forEach((cell) => {
      if (cell !== 0) {
        counts[cell] = (counts[cell] || 0) + 1;
      }
    });
  });
  return counts;
});

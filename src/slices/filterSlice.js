import { createSlice } from "@reduxjs/toolkit";

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
    isBoardValid: true,
    validation: Array(9)
      .fill()
      .map(() => Array(9).fill(true)), // 9x9 array of true
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
      state.isBoardValid = isValid;
    },
    resetGame(state, action) {
      state.board = myBoard;
    },
  },
});

export const { startGame, updateBoard, resetGame } = filterSlice.actions;
export default filterSlice.reducer;

export const countNumbers = (state) => {
  const counts = {};
  state.filter.board.map((row) => {
    row.map((cell) => {
      if (cell !== 0) {
        counts[cell] = (counts[cell] || 0) + 1;
      }
    });
  });
  return counts;
};

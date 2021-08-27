// eslint-disable-next-line func-names
const game = (function () {
  let board = ['', '', '', '', '', '', '', '', ''];
  let gameOngoing = true;
  let currentPlayer = 'X';

  const winningCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [6, 4, 2],
    [0, 4, 8],
  ];

  const tie = "It's a tie!";
  const win = () => `${currentPlayer} won!`;
  const playerTurn = () => `It's ${currentPlayer}'s turn`;

  const resetButton = document.querySelector('.reset-button');
  const gameTitle = document.querySelector('.game-title');
  const gameStatus = document.getElementById('game-status');

  const markCell = (clickedCellElement, clickedCellValue) => {
    const boardClickedCellElement = clickedCellElement;
    if (currentPlayer === 'X') {
      boardClickedCellElement.style.color = '#003049';
      gameTitle.style.color = '#003049';
    } else {
      boardClickedCellElement.style.color = '#d62828';
      gameTitle.style.color = '#d62828';
    }
    board[clickedCellValue] = currentPlayer;
    boardClickedCellElement.textContent = currentPlayer;
  };

  const changePlayer = () => {
    // 'Reverse' color scheme to match next marker
    if (currentPlayer === 'O') {
      gameStatus.style.color = '#003049';
      gameTitle.style.color = '#003049';
    } else {
      gameStatus.style.color = '#d62828';
      gameTitle.style.color = '#d62828';
    }

    if (currentPlayer === 'X') {
      currentPlayer = 'O';
    } else {
      currentPlayer = 'X';
    }
    gameStatus.textContent = playerTurn();
  };

  const checkWinsWhileSwitchingPlayerTurns = () => {
    let gameEnd = false;

    /*
        There are 7 possible winning combinations (refer to winningCombo array).
        Set gameEnd to true if a winning combination has been found by the three char variables.
         */
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i <= 7; i++) {
      const firstChar = board[winningCombo[i][0]];
      const secondChar = board[winningCombo[i][1]];
      const thirdChar = board[winningCombo[i][2]];

      if (!firstChar || !secondChar || !thirdChar) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (firstChar === secondChar && secondChar === thirdChar) {
        gameEnd = true;
        break;
      }
    }

    if (gameEnd) {
      gameOngoing = false;
      gameStatus.textContent = win();
      if (currentPlayer === 'O') {
        resetButton.style.backgroundColor = '#d62828';
        gameTitle.style.color = '#d62828';
      } else {
        resetButton.style.backgroundColor = '#003049';
        gameTitle.style.color = '#003049';
      }
      return;
    }

    const tieGame = !board.includes('');

    if (tieGame) {
      gameOngoing = false;
      gameStatus.textContent = tie;
      gameStatus.style.color = '#f77f00';
      resetButton.style.backgroundColor = '#f77f00';
      gameTitle.style.color = '#f77f00';
      return;
    }
    changePlayer();
  };

  const initiateGame = (event) => {
    const clickedCell = event.target;
    const clickedCellValue = clickedCell.getAttribute('data-cell');

    if (board[clickedCellValue] !== '' || !gameOngoing) return;

    markCell(clickedCell, clickedCellValue);
    checkWinsWhileSwitchingPlayerTurns();
  };

  const reset = () => {
    document.querySelectorAll('.cell').forEach((cell) => {
      const boardCell = cell;
      boardCell.textContent = '';
    });
    gameOngoing = true;
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameStatus.textContent = playerTurn();
    gameStatus.style.color = '#003049';
    resetButton.style.backgroundColor = '#3c3744';
    gameTitle.style.color = '#003049';
  };

  return {
    initiateGame,
    reset,
  };
})();
document.querySelectorAll('.cell').forEach((cell) => cell.addEventListener('click', game.initiateGame));
document.querySelector('.reset-button').addEventListener('click', game.reset);

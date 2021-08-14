const game = (function () {

    let board = ["", "", "", "", "", "", "", "", ""];

    const winningCombo = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [6, 4, 2],
        [0, 4, 8]
    ];

    let gameOngoing = true;
    let currentPlayer = "X";
    const gameStatus = document.getElementById('game-status');

    const win = () => `${currentPlayer} won!`;
    const tie = "It's a tie!";
    const playerTurn = () => `It's ${currentPlayer}'s turn`;

    // Start game on click.
    function initiateGame(event) {
        const clickedCell = event.target;
        const clickedCellValue = clickedCell.getAttribute('data-cell');

        if (board[clickedCellValue] !== "" || !gameOngoing) return;

        markCell(clickedCell, clickedCellValue);
        checkCombo();
    }

    function markCell(clickedCellElement, clickedCellValue) {
        //// if (currentPlayer === 'X') clickedCellElement.style.color = '#1E3D59';
        //// else clickedCellElement.style.color = '#1E3D59';
        clickedCellElement.style.color = '#1E3D59';
        board[clickedCellValue] = currentPlayer;
        clickedCellElement.textContent = currentPlayer;
    }

    function checkCombo() {
        let gameEnd = false;
        //There are 7 possible winning combinations.
        for (let i = 0; i <= 7; i++) {
            let firstChar = board[winningCombo[i][0]];
            let secondChar = board[winningCombo[i][1]];
            let thirdChar = board[winningCombo[i][2]];

            // Continue while there are no winning combos.
            if (!firstChar || !secondChar || !thirdChar) {
                continue;
            }

            if (firstChar === secondChar && secondChar === thirdChar) {
                gameEnd = true;
                break;
            }
        }

        let tieGame = !board.includes("");

        if (gameEnd) {
            gameOngoing = false;
            gameStatus.textContent = win();
            return;
        }

        if (tieGame) {
            gameOngoing = false;
            gameStatus.textContent = tie;
            return;
        }
        changePlayer();
    }

    function changePlayer() {
        // Switch the markers every turn
        if (currentPlayer === 'X'){
            currentPlayer = 'O';
        } else {
            currentPlayer = 'X';
        }
        gameStatus.textContent = playerTurn();
    }

    function reset() {
        document.querySelectorAll('.cell').forEach(cell => cell.textContent = "");
        gameOngoing = true;
        currentPlayer = "X";
        board = ["", "", "", "", "", "", "", "", ""];
        gameStatus.textContent = playerTurn();
    }

    return {
        initiateGame,
        reset
    }
})();
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', game.initiateGame));
document.querySelector('.reset-button').addEventListener('click', game.reset);
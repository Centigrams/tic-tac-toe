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

    const resetButton = document.querySelector('.reset-button');
    const gameTitle = document.querySelector('.game-title');

    // Start game on click.
    function initiateGame(event) {
        const clickedCell = event.target;
        const clickedCellValue = clickedCell.getAttribute('data-cell');

        if (board[clickedCellValue] !== "" || !gameOngoing) return;

        markCell(clickedCell, clickedCellValue);
        checkCombo();
    }

    function markCell(clickedCellElement, clickedCellValue) {
        if (currentPlayer === 'X'){
            clickedCellElement.style.color = '#003049';
            gameTitle.style.color = '#003049';
        } else {
            clickedCellElement.style.color = '#d62828';
            gameTitle.style.color = '#d62828';
        }
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
            if (currentPlayer === 'O') {
                resetButton.style.backgroundColor = '#d62828';
                gameTitle.style.color = '#d62828';
            } else {
                resetButton.style.backgroundColor = '#003049'
                gameTitle.style.color = '#003049';
            }
            return;
        }

        if (tieGame) {
            gameOngoing = false;
            gameStatus.textContent = tie;
            gameStatus.style.color = '#f77f00';
            resetButton.style.backgroundColor = '#f77f00';
            gameTitle.style.color = '#f77f00';
            return;
        }
        changePlayer();
    }
    
    function changePlayer() {
        // 'Reverse' color scheme to match next marker
        if (currentPlayer === 'O') {
            gameStatus.style.color = '#003049';
            gameTitle.style.color = '#003049'
        } else {
            gameStatus.style.color = '#d62828';
            gameTitle.style.color = '#d62828'
        }
        // Switch the markers every turn
        if (currentPlayer === 'X') {
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
        gameStatus.style.color = '#003049';
        resetButton.style.backgroundColor = '#3c3744';
        gameTitle.style.color = '#003049';
    }

    return {
        initiateGame,
        reset
    }
})();
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', game.initiateGame));
document.querySelector('.reset-button').addEventListener('click', game.reset);
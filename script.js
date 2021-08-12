let game = (function () {

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
    const gameStatus = document.querySelector('.game-status');

    // Game status messages:
    const win = () => `${currentPlayer} won!`;
    const tie = "It's a tie!";
    const playerTurn = `It's ${currentPlayer}'s turn`;

    //Initiate Game on click.
    function initiateGame(event) {
        const clickedCell = e.target;
        const clickedCellValue = clickedCell.getAttribute('data-cell');

        if (board[clickedCellValue] !== "" || !gameOngoing) return;

        markCell();
        checkEndGame();

    }

    // Mark cell if valid
    function markCell();

    // Check if game is finished and transition player turns
    function checkEndGame() {

    };

    // Function to change player after move
    function changePlayer() {

    }

    // Restart Game
    function reset() {

    }

    return {
        initiateGame, 
        reset
    }
})();
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', game.initiateGame));
document.querySelector('.reset-button').addEventListener('click', reset);
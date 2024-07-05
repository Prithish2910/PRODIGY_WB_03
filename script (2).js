// script.js
const cells = document.querySelectorAll('.cell');
const messageElement = document.getElementById('message');
const restartButton = document.getElementById('restart');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (e) => {
    const cell = e.target;
    const index = cell.getAttribute('data-index');

    if (board[index] !== '' || !isGameActive) {
        return;
    }

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const checkWinner = () => {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        messageElement.textContent = `Player ${currentPlayer} Wins!`;
        isGameActive = false;
        return;
    }

    if (!board.includes('')) {
        messageElement.textContent = 'Draw!';
        isGameActive = false;
    }
};

const restartGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    messageElement.textContent = '';
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
    });
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);

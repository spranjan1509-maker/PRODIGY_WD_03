const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");
const modeBtn = document.getElementById("mode");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let vsAI = false;

const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

cells.forEach(cell => cell.addEventListener("click", handleClick));
restartBtn.addEventListener("click", restartGame);
modeBtn.addEventListener("click", toggleMode);

function handleClick() {
    const index = this.getAttribute("data-index");

    if (board[index] !== "" || !gameActive) return;

    makeMove(index, currentPlayer);

    if (checkWinner()) return;

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;

    if (vsAI && currentPlayer === "O") {
        setTimeout(aiMove, 500);
    }
}

function makeMove(index, player) {
    board[index] = player;
    cells[index].textContent = player;
}

function checkWinner() {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            statusText.textContent = `Player ${board[a]} Wins! 🎉`;
            gameActive = false;
            return true;
        }
    }

    if (!board.includes("")) {
        statusText.textContent = "It's a Draw!";
        gameActive = false;
        return true;
    }
    return false;
}

function aiMove() {
    let emptyCells = board
        .map((val, index) => val === "" ? index : null)
        .filter(v => v !== null);

    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    makeMove(randomIndex, "O");

    if (checkWinner()) return;

    currentPlayer = "X";
    statusText.textContent = "Player X's Turn";
}

function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => cell.textContent = "");
    currentPlayer = "X";
    gameActive = true;
    statusText.textContent = "Player X's Turn";
}

function toggleMode() {
    vsAI = !vsAI;
    modeBtn.textContent = vsAI ? "Two Player Mode" : "Play vs AI";
    restartGame();
}

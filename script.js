"use strict";
window.addEventListener("DOMContentLoaded", main);
const board = document.getElementById('board');
let tictactoeBoard = Array.from({ length: 9 }, () => null).reduce((acc, _, i) => ({ ...acc, [i]: null }), {});
let player = true

for (let i = 0; i <= 8; i++) {
    const cell = document.createElement('div');
    cell.id = "cell"+i;
    cell.className = 'cell';
    board.appendChild(cell);
}

function main() {
    document.querySelector("#board").addEventListener("click", clickBoard);
}

function clickBoard(event) {
    const cellIndex = parseInt(event.target.id.replace("cell", ""), 10);
    if (tictactoeBoard[cellIndex] === null) {
        tictactoeBoard[cellIndex] = player ? 'X' : 'O';
        displayModel();
        checkWinners();
        player = !player;
    }
}

function displayModel() {
    Object.keys(tictactoeBoard).forEach(i => {
        document.querySelector(`#cell${i}`).textContent = tictactoeBoard[i] || " ";
    });
}

function checkWinners() {
    ["O", "X"].forEach((symbol) => {
        if (isWinner(symbol)) {
            document.querySelector("#status").textContent = `Game Over - ${symbol} wins`;
            document.querySelector("#board").removeEventListener("click", clickBoard);
        }
    });
}

function isWinner(symbol) {
    const winningCombinations = ['012', '345', '678','036', '147', '258', '048', '246'].map(combination => combination.split('').map(Number));
    return winningCombinations.some(combination => 
        combination.every(index => tictactoeBoard[index] === symbol)
    );
}
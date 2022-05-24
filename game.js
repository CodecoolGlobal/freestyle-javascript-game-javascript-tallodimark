const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const difficulty = urlParams.get('difficulty');
const rows = 27
const cols = 54
let monsterNumber = 0;
let coinNumber = 0;
let chestNumber = 0;
let swordNumber = 0;
let monsterHp = 0;
let heroHp = 0;
let difficultyTimer = 0;
if (difficulty === 'Easy') {
    monsterNumber = 5;
    coinNumber = 10;
    chestNumber = 5;
    swordNumber = 3;
    monsterHp = 1;
    heroHp = 10;
    difficultyTimer = 3000;
} else if (difficulty === 'Medium') {
    monsterNumber = 10;
    coinNumber = 7;
    chestNumber = 3;
    swordNumber = 2;
    monsterHp = 2;
    heroHp = 7;
    difficultyTimer = 2000;
} else if (difficulty === 'Hard') {
    monsterNumber = 20;
    coinNumber = 4;
    chestNumber = 1;
    swordNumber = 1;
    monsterHp = 3;
    heroHp = 3;
    difficultyTimer = 1000;
}

initGame();

function initGame() {
    this.drawBoard();
    this.drawWalls()
    this.populateBoard();
    this.placeHero();
    this.initKeyUp();
}

function drawBoard () {
    let gameField = document.querySelector(".game-field");
    this.setGameFieldSize(gameField);
    let cellIndex = 0
    for (let row = 0; row < rows; row++) {
        const rowElement = this.addRow(gameField);
        for (let col = 0; col < cols; col++) {
            this.addCell(rowElement, row, col);
            cellIndex++
        }
    }

}
function drawWalls () {
    firstAndLastRowAndCol = document.querySelectorAll('[data-row="0"], [data-row="' + (rows - 1) + '"],' +
        '[data-col="0"], [data-col="' + (cols - 1) + '"]')
    for (let element of firstAndLastRowAndCol) {
        element.classList.add('wall')
    }
    let secondCol = Math.round(cols / 3)
    let thirdCol = Math.round((cols / 3) * 2)
    let rowGates = [`${Math.round(rows/6)}`, `${Math.round((rows/6) * 3)}`, `${Math.round((rows/6) * 5)}`]
    let colGates = [`${Math.round(cols/6)}`, `${Math.round((cols/6) * 3)}`, `${Math.round((cols/6) * 5)}`]
    let secondAndThirdCol = document.querySelectorAll('[data-col="' + secondCol + '"], [data-col="' + thirdCol + '"]')
    for (let element of secondAndThirdCol) {
        if (rowGates.includes(element.getAttribute('data-row'))) {
            element.classList.add("gate")
            continue
        }
        element.classList.add('wall')
    }
    let secondRow = Math.round(rows / 3)
    let thirdRow = Math.round((rows / 3) * 2)
    let secondAndThirdRow = document.querySelectorAll('[data-row="' + secondRow + '"], [data-row="' + thirdRow + '"]')
    for (let element of secondAndThirdRow) {
        if (colGates.includes(element.getAttribute('data-col'))) {
            element.classList.add("gate")
            continue
        }
        element.classList.add('wall')
    }
}
function addRow(gameField) {
    gameField.insertAdjacentHTML(
        'beforeend',
        '<div class="row"></div>'
    );
    return gameField.lastElementChild;
}
function addCell(rowElement, row, col) {
    rowElement.insertAdjacentHTML(
        'beforeend',
        `<div class="field"
                    data-row="${row}"
                    data-col="${col}"></div>`);
}
function setGameFieldSize(gameField) {
    gameField.style.width = (gameField.dataset.cellWidth * cols) + 'px';
    gameField.style.height = (gameField.dataset.cellHeight * rows) + 'px';
}

function initKeyUp () {
    document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowUp') {console.log(event.key)
    } else if (event.key === 'ArrowDown') {console.log(event.key)
    } else if (event.key === 'ArrowLeft') {console.log(event.key)
    } else if (event.key === 'ArrowRight') {console.log(event.key)
    } else if (event.key === ' ') {console.log(event.key)
    } else {console.log('invalid')
    }
    })
}

function checkNeighborCells(randomRow, randomCol) {
    let rowBefore = 0;
    if (randomRow != 0) {rowBefore = randomRow - 1}
    let rowAfter = randomRow + 1;
    if (rowAfter > rows - 1) {rowAfter = randomRow}
    let colBefore = 0;
    if (randomCol != 0) {colBefore = randomCol - 1}
    let colAfter = randomCol + 1;
    if (colAfter > cols - 1) {colAfter = randomCol}
    for (let i = rowBefore; i < rowAfter + 1; i++) {
        if (document.querySelector('[data-row="' + i + '"][data-col="' + randomCol + '"]')
                .classList.contains("gate") ||
            document.querySelector('[data-row="' + i + '"][data-col="' + randomCol + '"]')
                .classList.contains("wall") ||
            document.querySelector('[data-row="' + i + '"][data-col="' + randomCol + '"]')
                .classList.contains("monster"))
            return false
    }
    for (let j = colBefore; j < colAfter + 1; j++) {
        if (document.querySelector('[data-row="' + randomRow + '"][data-col="' + j + '"]')
                .classList.contains("gate") ||
            document.querySelector('[data-row="' + randomRow + '"][data-col="' + j + '"]')
                .classList.contains("wall") ||
            document.querySelector('[data-row="' + randomRow + '"][data-col="' + j + '"]')
                .classList.contains("monster"))
            return false
    }
    return true
}

function populateBoard() {
    spawnEnemies();

}

function spawnEnemies() {
    for (let i = 0; i < monsterNumber; i++) {
        let checkNeighbor = false
        while (!checkNeighbor) {
            let randomRow = getRandomInt(0, rows)
            let randomCol = getRandomInt(0, cols)
            checkNeighbor = checkNeighborCells(randomRow, randomCol)
            if (checkNeighbor) {
                let monster = document.querySelector('[data-row="' + randomRow + '"][data-col="' + randomCol + '"]')
                monster.classList.add("monster")
                monster.setAttribute("id", i)
            }
        document.querySelector(".stats").setAttribute("data-monster-" + i + "-hp", monsterHp)
        }
    }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function moveMonserts(monsterNumber, difficultyTimer) {
    for (let i=0; i<monsterNumber; i++) {
        let currentMonster = document.querySelector('.monster' + i);
        let currentMonsterRow = currentMonster.dataset.row;
        let currentMonsterCol = currentMonster.dataset.col;
    }
}
function placeHero() {
    document.querySelector('[data-row = "5"][data-col = "2"]').classList.add('hero_stands');
}
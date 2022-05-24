const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const difficulty = urlParams.get('difficulty');
const rows = 27
const cols = 54
let monsterNumber = 0;
let coinNumber = 0;
let chestNumber = 0;
let swordNumber = 0;
let monstertHp = 0;
let heroHp = 0;
let difficultyTimer = 0;
if (difficulty === 'Easy') {
    monsterNumber = 5;
} else if (difficulty === 'Medium') {
    monsterNumber = 10;
} else if (difficulty === 'Hard') {
    monsterNumber = 20;
}

initGame();

function initGame() {
    this.drawBoard();
    this.drawWalls()
    this.populateBoard(monsterNumber);
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
        ;
    }

}
function drawWalls () {
    firstAndLastRowAndCol = document.querySelectorAll('[data-row="0"], [data-row="' + (rows - 1) + '"],' +
        '[data-col="0"], [data-col="' + (cols - 1) + '"]')
    for (let element of firstAndLastRowAndCol) {
        element.classList.add('wall')}
    let secondCol = Math.round(cols / 3)
    let thirdCol = Math.round((cols / 3) * 2)
    let secondAndThirdCol = document.querySelectorAll('[data-col="' + secondCol + '"], [data-col="' + thirdCol + '"]')
    for (let element of secondAndThirdCol) {
        element.classList.add('wall')}
    let secondRow = Math.round(rows / 3)
    let thirdRow = Math.round((rows / 3) * 2)
    let secondAndThirdRow = document.querySelectorAll('[data-row="' + secondRow + '"], [data-row="' + thirdRow + '"]')
    for (let element of secondAndThirdRow) {
        element.classList.add('wall')}
    // let string1 = ''
    // for (let i = 1; i < 4; i++) {
    //     '[data-row="' + Math.round(secondCol / 2) + '"][data-col="' + Math.round(secondRow/2 * i) + '"]'
    // }
    // let colGates = document.querySelectorAll('[data-row="' +
    //     Math.round(secondCol / 2) + '"], [data-row="' + secondCol + '"], [data-row="' +
    //     Math.round(secondCol * 1,5) + '"]')
    // for (let element of colGates) {
    //     element.classList.remove('wall')}
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

function populateBoard(monsterNumber) {
    console.log(monsterNumber);
}

function moveMonserts(monsterNumber, difficultyTimer) {
    for (let i=0; i<monsterNumber; i++) {
        let currentMonster = document.querySelector('.monster' + i);
        let currentMonsterRow = currentMonster.dataset.row;
        let currentMonsterCol = currentMonster.dataset.col;
    }
}
function placeHero() {
    console.log("placeHero")
}